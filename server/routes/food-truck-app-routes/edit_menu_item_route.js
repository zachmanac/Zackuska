const express = require('express');
const router = express.Router();
const updateMenuItem = require('../../database/queries/menu/update_menu_item');

router.put('/api/menuItems/:item_id', (req, res) => {
  const itemId = req.params.item_id;
  const updatedData = req.body;

  updateMenuItem(itemId, updatedData)
    .then(() => {
      res.status(200).json({ message: 'Menu item updated successfully' });
    })
    .catch(e => {
      console.error('Failed to update menu item:', e);
      res.status(500).json({ error: 'Failed to update menu item' });
    });
});

module.exports = router;