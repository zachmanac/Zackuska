const express = require('express');
const router = express.Router();

const getCartItems = require ('../../database/queries/get_cart_items');

// GET route to fetch cart items for a specific cart
router.get('/api/cart/:cart_id/items', (req, res) => {
  const { cart_id } = req.params;

  // Perform necessary operations to fetch cart items from the database
  getCartItems(cart_id)
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
