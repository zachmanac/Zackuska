const express = require('express');
const router = express.Router();
//not sure if we need this
// POST route to save cart items in the session
router.post('/api/cart', (req, res) => {
  const { truck_id, menu_items } = req.body;
  const user_id = req.session.userId;

  // Convert menu_items to an array of objects
  /*const items = Object.entries(menu_items).map(([item_id, quantity]) => ({
    item_id: parseInt(item_id),
    quantity: parseInt(quantity),
  }))
  //keys are items_id  values are quantities
  const menu_items = [{"1":2},{"3":1},{"5":3}] json format
      // item_id: quantity
    
  };
  */
  // Save the cart items in the session
  req.session.cart = {
    truck_id: truck_id,
    menu_items: menu_items
    //user_id: user_id

  };

  res.json({ message: 'Cart items added successfully' });
});

module.exports = router;
