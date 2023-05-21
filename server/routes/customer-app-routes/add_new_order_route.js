const express = require('express');
const router = express.Router();
const addNewOrder = require('../../database/queries/order/add_new_order');
//const submitOrder= require('../order/submit_order_function');



router.post('/api/cart/checkout', async (req, res) => {
 /* const user_id = req.session.userId;
  const cart=req.session.cart;
  const truck_id=cart.truck_id;
  const menu_items= cart.session.menu_items;*/
  const status = 'Pending';
  const response='waiting for the trucks response';

  //hardcode for test until cart works
  const { user_id, menu_items, total_amount, total_calories, truck_id } = req.body;
  // const truck_id = menu_items[0].truck_id;
  //const {total_amount, total_calories}=req.body;
  
  /*cart has something like this:
   req.session.cart = {
    truck_id: truck_id,
    menu_items: menu_items
  
  };
 /*this is how menu_items look like menu_items=[ { "1": 2 },
    { "6": 1 }] item_id:quantity
  */

  try {
  
      
    // Call the addNewOrder function to create a new order in the database
    const order = await addNewOrder(user_id, truck_id, status, total_amount, total_calories, menu_items, response);

    res.json(order);
  } catch (error) {
    console.error('Failed to create new order:', error);
    res.status(500).json({ error: 'Failed to create new order' });
  }
});


module.exports = router;
