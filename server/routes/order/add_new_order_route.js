const express = require('express');
const router = express.Router();
const addNewOrder = require('../../database/queries/order/add_new_order');

router.post('/api/cart/checkout', async (req, res) => {
  const { user_id } = req.session.userId;
  const { truck_id } = req.session.cart;
  const menuItemsFromCart = req.session.cart.menu_items;
  const { total_amount, total_calories } = req.body;

  // Convert menu_items to an array of objects
  const menu_items = Object.entries(menuItemsFromCart).map(([item_id, quantity]) => ({
    item_id: parseInt(item_id),
    quantity: parseInt(quantity),
  }));

  try {
    // Call the addNewOrder function to create a new order in the database
    const order = await addNewOrder(user_id, truck_id, 'pending', total_amount, total_calories, null, menu_items);//date is set to null in the query is set to now

    res.json(order); // Send order
  } catch (error) {
    console.error('Failed to create new order:', error);
    res.status(500).json({ error: 'Failed to create new order' });
  }
});

module.exports = router;
