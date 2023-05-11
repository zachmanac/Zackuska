const express = require('express');
const router = express.Router();

const {
  insertCartItem,
  getCartItems,
  updateCartItem,
  deleteCartItem
} = require('../database/cart');

// PUT route to change the quantity of a cart item
router.put('/api/cart/:cart_id', (req, res) => {
    const { cart_id } = req.params;
    const { quantity } = req.body;
  
    // Perform necessary operations to update the quantity of the cart item in the database
    updateCartItem(cart_id, quantity)
      .then(() => {
        // Retrieve the updated cart items after changing the quantity
        return getCartItems(user_id);
      })
      .then(cartItems => {
        // Send the updated cart items as the response
        res.json(cartItems);
      })
      .catch(error => {
        // Error occurred while updating the cart item quantity
        console.error('Failed to update cart item quantity:', error);
        res.status(500).send('Failed to update cart item quantity');
      });
  });
  

module.exports = router;
