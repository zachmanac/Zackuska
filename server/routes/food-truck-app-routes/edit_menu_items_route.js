const express = require('express');
const router = express.Router();
const queryUpdateMenuItem = require('../../database/queries/menu/update_menu_item');

router.put('/api/trucks/menu_items/:item_id', async (req, res) => {
  const updated_item=req.body;/*this is an object like this 
  const updated_item = {
    item_name: 'New Item Name',
    price: 9.99,
    calories: 500,
    allergens: 'No allergens',
    halal: true,
    picture: 'new_item.jpg',
    description: 'Updated item description',
    item_label: 'New Label',
    quantity: 100,
    active: false,
  };*/
  const item_id = req.params.item_id;

  try {
    const result= await queryUpdateMenuItem(item_id,updated_item);
    res.json(result);
  } catch (error) {
    console.error('Failed to update menu item:', error);
    res.status(500).json({ error: 'Failed to update menu item' });
  }
});

module.exports = router;
