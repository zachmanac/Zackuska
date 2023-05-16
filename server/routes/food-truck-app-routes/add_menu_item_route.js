const express = require('express');
const router = express.Router();
const query = require('../../database/queries/menu/add_menu_item');

router.post('/api/trucks/:truck_id/menu_items', async (req, res) => {
  try {
    console.log("new menu item", req.body);
    const truck_id = req.params.truck_id;
    const { item_name, price, colories, allergens, halal, picture, description, item_label, quantity } = req.body;

    await query(truck_id, item_name, price, colories, allergens, halal, picture, description, item_label, quantity);
    console.log("Menu Item added successfully");
    res.send("Item Added");
  } catch (e) {
    console.error("Fail to add new item to database", e);
    res.send("Fail to add new item to database");
  }
});

module.exports = router;

