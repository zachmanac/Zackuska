const express = require('express');
const userRoutes = express.Router();
const { registerUser, loginUser, logoutUser, checkLoggedIn } = require('../controllers/userController');

// Route for user registration
userRoutes.post('/register', async (req, res) => {
  console.log ("somethingin RR")
  const { name, last_name, email, password} = req.body;
  const user_type = 'customer'; // Set the user type to 'customer' by default
  try {
    const newUser = await registerUser(req, name, last_name, email, password, user_type);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Route for user login
userRoutes.post('/login', async (req, res) => {
  console.log ("somethingin Routes")
  const { email, password } = req.body;
  try {
    const user = await loginUser(req, email, password);
    console.log("user", user)
    res.status(200).json(user);
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(401).json({ error: 'Invalid email or password' });
  }
});

// Route for user logout
userRoutes.post('/logout', async (req, res) => {
  try {
    await logoutUser(req);
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    console.error('Error during user logout:', error);
    res.status(500).json({ error: 'Failed to log out user' });
  }
});

// Route for checking if a user is logged in
userRoutes.get('/checkLoggedIn', (req, res) => {
  console.log("re.session", req.session)
  if (req.session.loggedIn) {
    // User is logged in
    res.status(200).json({ user: req.session.user });
  } else {
    // User is not logged in
    res.status(401).json({ error: 'User is not logged in' });
  }
});


module.exports = userRoutes;
