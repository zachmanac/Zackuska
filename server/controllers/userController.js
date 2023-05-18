const bcrypt = require('bcrypt');
const add_new_user = require('../database/queries/user/add_new_user');
const getUserWithEmail = require('../database/queries/user/get_user_with_email');
const getUserWithId = require('../database/queries/user/get_user_with_id');
const { createSession, destroySession } = require('../actions/sessionActions');

// Function to register a new user
const registerUser = async (req, name, last_name, email, password, user_type) => {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Call the createUserQuery function to add the user to the database
      const newUser = await add_new_user(name, last_name, email, hashedPassword, user_type);
  
      // Create a session for the authenticated user
      await createSession(req, newUser.user_id);
  
      return newUser;
    } catch (error) {
      console.error('Error during user registration:', error);
      throw new Error('Failed to register user');
    }
  };
  
  // Function to authenticate and log in a user
  const loginUser = async (req, email, password) => {
    try {
      // Retrieve the user from the database using the getUserByEmailQuery function
      const user = await getUserWithEmail(email);
  
      // Compare the provided password with the hashed password stored in the user object
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid email or password');
      }
  
      // Create a session for the authenticated user
      await createSession(req, user.user_id);
      console.log("Session", req.session);
  
      return user;
    } catch (error) {
      console.error('Error during user login:', error);
      throw new Error('Failed to log in user');
    }
  };
  
  // Function to log out a user
  const logoutUser = async (req) => {
    try {
      // Destroy the session for the current user
      await destroySession(req);
  
      return { message: 'User logged out successfully' };
    } catch (error) {
      console.error('Error during user logout:', error);
      throw new Error('Failed to log out user');
    }
  };

  const checkLoggedIn = (req, res) => {
    if (req.session.checkLoggedIn) {
      // User is logged in
      res.status(200).json({ user: req.session.user });
    } else {
      // User is not logged in
      res.status(401).json({ error: 'User is not logged in' });
    }
  };
  
  module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    checkLoggedIn,
  };