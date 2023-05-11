const express = require('express');
const router = express.Router();

// Assuming you have a database connection, import the necessary functions to interact with the cart in the database
const getCartItems = require('../database/cart');


// GET route to fetch cart items for a user
router.get('/api/cart/:user_id', (req, res) => {
  const { user_id } = req.params;

  // Perform necessary operations to fetch cart items from the database
  getCartItems(user_id)
    .then(cartItems => {
      // Send the cart items as the response
      res.json(cartItems);
    })
    .catch(error => {
      // Error occurred while fetching the cart items
      console.error('Failed to fetch cart items:', error);
      res.status(500).send('Failed to fetch cart items');
    });
});


module.exports = router;
