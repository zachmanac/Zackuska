const express = require('express');
const router = express.Router();
const queryCheckUser = require('../../database/queries/user/get_user_with_email');
const bcrypt = require('bcryptjs');
const session = require('express-session');

console.log('Code is executing...');

// Check if a user exists with a given username, userType and password
const login = async function(email, password, user_type) {
  const user = await queryCheckUser(email);

  if (!user) {
    return { error: 'There is no user with that email' };
  }
  
  if (!bcrypt.compareSync(password, user.password)) {
    return { error: "Wrong password" };
  }
  
  if (user.user_type !== user_type) {
    return { error: "Wrong user type" };
  }
  
  return user;
};

router.post('/api/session', async (req, res) => {
  
  const { email, password, user_type } = req.body;
  
  console.log('Logging in user:', email); // Add this line to log the user email
  try {
    const result = await login(email, password, user_type);

    if (result.error) {
      console.log('Error:', result); 
      return res.status(401).send(result);
    }

    // Store the user ID in the session
    req.session.userId = result.userId; // Save user ID to the session

    console.log('Updated Session1:', req.session.userId); // Move this line inside the try block

    res.send(result);
  } catch (e) {
    console.error('Error:', e); 
    res.status(500).send({ error: 'Server error' });
  }
  console.log('Updated Session2:', req.session);
});


module.exports = router;
