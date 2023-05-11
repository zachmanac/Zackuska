const express = require('express');
const router = express.Router();
const queryGetReviewsForItem= require('../../database/queries/get_reviews_for_items');


// DELETE route to remove a cart item
router.delete('/api/cart/:cart_id', (req, res) => {
    const { cart_id } = req.params;
  
    // Perform necessary operations to remove the cart item from the database
    deleteCartItem(cart_id)
      .then(() => {
        // Retrieve the updated cart items after deleting the item
        return getCartItems(user_id);
      })
      .then(cartItems => {
        // Send the updated cart items as the response
        res.json(cartItems);
      })
      .catch(error => {
        // Error occurred while deleting the cart item
        console.error('Failed to delete cart item:', error);
        res.status(500).send('Failed to delete cart item');
      });
  });
  