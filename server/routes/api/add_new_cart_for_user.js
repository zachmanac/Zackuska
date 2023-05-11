const express = require('express');
const router = express.Router();

const insert_cart_item = require('../../database/queries/insert_cart_item');

router.post('/api/sendCart', (req, res) => {
  const { user_id, food_truck_id, item_id, quantity } = req.body;

  // Perform necessary operations to insert the cart item into the database
  insert_cart_item(user_id, food_truck_id, item_id, quantity)
    .then(() => {
      // Cart item insertion successful
      res.send('Cart item added successfully');
    })
    .catch(error => {
      // Error occurred while inserting the cart item
      console.error('Failed to insert cart item:', error);
      res.status(500).send('Failed to add item to cart');
    });
});

module.exports = router;
