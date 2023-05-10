const express = require('express');
const router = express.Router();
const query = require('../../database/queries/add_menu_item');

//need to add active and stock for inventory
router.post('/api/trucks/:trucks_id/menu_items', (req, res) => {
  console.log("new menu item", req.body)
  const new_item = req.body;

  query(new_item.truck_id, new_item.item_name, new_item.price, new_item.calories, new_item.allergens, new_item.halal, new_item.picture, new_item.description, new_item.item_label)

    .then(() => {
      console.log("Menu Item added sucessfully")
      res.send("Item Added")
    })
    .catch(e => {
      console.error("Fail to add new item to database", e);
      res.send(e)
    });


});

module.exports = router;


