const express = require('express');
const router = express.Router();
const addNewOrder = require('../../database/queries/order/add_new_order');
const submitOrder= require('./submit_order_function');



router.post('/api/cart/checkout', async (req, res) => {
  try {
    const {user_id, truck_id, menu_items, total_amount, total_calories } = req.body;
    const status='pending';
    //const user_id = req.session.userId;
 
    // Call the addNewOrder function to create a new order in the database
    const order = await addNewOrder(user_id, truck_id, status, total_amount, total_calories, menu_items);
    const truck_res =await submitOrder(order.order_id);
    console.log("RESPONSE FROM TRUCK", truck_res);
    res.json(truck_res); // Send order response
  } catch (error) {
    console.error('Failed to create new order:', error);
    res.status(500).json({ error: 'Failed to create new order' });
  }
  
  
});

module.exports = router;
