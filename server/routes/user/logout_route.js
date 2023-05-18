const express = require('express');
const router = express.Router();

router.delete('/api/session', (req, res) => {
  const userId = req.session.userId; // Retrieve the user ID from the session

  req.session.destroy((err) => {
    if (err) {
      console.log('Error:', err);
      res.status(500).send('Error logging out');
    } else {
      // Perform any necessary actions associated with the user's logout
      console.log('User logged out:', userId);

      res.send("Logged out");
    }
  });
});

module.exports = router;
