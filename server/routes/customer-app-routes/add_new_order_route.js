const express = require('express');
const router = express.Router();
const addNewOrder = require('../../database/queries/order/add_new_order');
//const submitOrder= require('../order/submit_order_function');



router.post('/api/cart/checkout', async (req, res) => {
  try {
    const {user_id, truck_id, menu_items, total_amount, total_calories } = req.body;
    const status='pending';
    //const user_id = req.session.userId;
    //not sure if we are getting the user_id from session or from the request
    
    // Call the addNewOrder function to create a new order in the database
    const order = await addNewOrder(user_id, truck_id, status, total_amount, total_calories, menu_items);

    res.send('order added as pending');
  } catch (error) {
    console.error('Failed to create new order:', error);
    res.status(500).json({ error: 'Failed to create new order' });
  }
  
  
});

module.exports = router;
