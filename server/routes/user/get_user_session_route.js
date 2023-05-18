const express = require('express');
const router = express.Router();

// Route to get the current user session
router.get('/api/session', (req, res) => {
    console.log("User session", req.session);
  if (req.session.user) {
    // User is logged in
    res.status(200).json({ loggedIn: true, userId: req.session.userId });
  } else {
    // User is not logged in
    res.status(200).json({ loggedIn: false });
  }
});

module.exports = router;
