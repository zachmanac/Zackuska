const express = require('express');
const router = express.Router();

// POST route to save cart items in the session
router.post('/api/cart', (req, res) => {
  const { truck_id, menu_items } = req.body;
  const user_id = req.session.userId;

  // Convert menu_items to an array of objects
  const items = Object.entries(menu_items).map(([item_id, quantity]) => ({
    item_id: parseInt(item_id),
    quantity: parseInt(quantity),
  }));

  // Save the cart items in the session
  req.session.cart = {
    truck_id: truck_id,
    menu_items: items,
    user_id: user_id,
    // Other properties...
  };

  res.json({ message: 'Cart items added successfully' });
});

module.exports = router;
