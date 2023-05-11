const express = require('express');
const router = express.Router();
const update_quantity_cart_item = require('../../database/queries/update_quantity_cart_item');

// PUT route to update the quantity of a cart item
router.put('/api/cart/:cart_id/cart_items/:cart_item_id', (req, res) => {
  const { cart_id, cart_item_id } = req.params;
  const { quantity } = req.body;
  
  update_quantity_cart_item(cart_item_id, quantity)
    .then(() => {
      res.status(200).send('Cart item quantity updated successfully');
    })
    .catch(error => {
      console.error('Failed to update cart item quantity:', error);
      res.status(500).send('Failed to update cart item quantity');
    });
});

module.exports = router;
