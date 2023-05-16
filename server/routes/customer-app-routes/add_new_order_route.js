const express = require('express');
const router = express.Router();
const addNewOrder = require('../../database/queries/order/add_new_order');
//const submitOrder= require('../order/submit_order_function');



router.post('/api/cart/checkout', async (req, res) => {
  try {
    const { user_id, truck_id, menu_items, total_amount, total_calories } = req.body;
    const status = 'pending';
    
    // Verify that menu_items is an array and each item has item_id and quantity
    if (!Array.isArray(menu_items) || menu_items.some(item => !item.item_id || !item.quantity)) {
      return res.status(400).json({ error: 'Invalid menu_items format' });
    }

    // Call the addNewOrder function to create a new order in the database
    const order = await addNewOrder(user_id, truck_id, status, total_amount, total_calories, menu_items);

    res.json(order);
  } catch (error) {
    console.error('Failed to create new order:', error);
    res.status(500).json({ error: 'Failed to create new order' });
  }
});


module.exports = router;
