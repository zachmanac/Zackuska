const express = require('express');
const router = express.Router();
const query = require('../../database/queries/user/get_user_with_id');

// Get user from the database using the userId stored in the session
router.get("/api/me", async (req, res) => {
  console.log("SESSION USER ID", req.session);
  try {
    const userId = req.session.userid;
  
    if (!userId) {
      return res.status(401).json({ message: "Not logged in" });
    }

    // Get user from the database using the user ID
    const retrievedUser = await query(userId);
    console.log("User", retrievedUser);

    if (!retrievedUser) {
      return res.status(404).json({ error: "No user with that id" });
    }

    res.json(retrievedUser); // Send user
  } catch (error) {
    console.error("Failed to retrieve user from the database", error);
    res.status(500).json({ error: "Failed to retrieve user" });
  }
});

module.exports = router;
