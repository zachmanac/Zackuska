const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const queryAddUser = require('../../database/queries/user/add_new_user');
const queryCheckUser = require('../../database/queries/user/get_user_with_email');

// Create a new user and validate by email
router.post('/api/users', async (req, res) => {
  try {
    console.log("New user params", req.body);
    const { name, last_name, email, password, user_type } = req.body;

    // Check if the user already exists in the database
    const existingUser = await queryCheckUser(email);
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // User does not exist, proceed with adding the new user
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await queryAddUser(name, last_name, email, hashedPassword, user_type);
    console.log("New user", newUser);
    req.session.userId = newUser.id;
    res.json({ message: "User added successfully" });
  } catch (error) {
    console.error("Failed to add new user to the database", error);
    res.status(500).json({ error: "Failed to add new user" });
  }
});

module.exports = router;
