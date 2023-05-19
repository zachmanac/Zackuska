const express = require('express');
const router = express.Router();
const getUserWithEmail = require('../../database/queries/user/get_user_with_email');

// Get user from the database using the email
router.get('/api/user/', async (req, res) => {
  try {
    const { email } = req.params;

    // Get user from the database using the email
    const retrievedUser = await getUserWithEmail(email);
    console.log('User', retrievedUser);

    if (!retrievedUser) {
      return res.status(404).json({ error: 'No user with that email' });
    }

    res.json(retrievedUser); // Send user
  } catch (error) {
    console.error('Failed to retrieve user from the database', error);
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
});

module.exports = router;
