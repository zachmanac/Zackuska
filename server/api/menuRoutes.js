const express = require('express');
const { add_new_menu_item, listMenuItems, getItemByIdQuery } = require('../controllers/menuController');

const router = express.Router();

// Route: POST /api/menu_items
// Add a new menu item
router.post('/', async (req, res) => {
  try {
    const { truck_id, item_name, price, calories, allergens, halal, picture, description, item_label, quantity } = req.body;

    // Add the new menu item
    await add_new_menu_item(truck_id, item_name, price, calories, allergens, halal, picture, description, item_label, quantity);

    res.status(200).json({ message: 'Menu item added successfully' });
  } catch (error) {
    console.error('Error adding menu item:', error);
    res.status(500).json({ error: 'Failed to add menu item' });
  }
});

// Route: GET /api/menu_items
// Get all menu items for a truck
router.get('/', async (req, res) => {
  try {
    const { truck_id } = req.query;

    // Get the list of menu items for the truck
    const menuItems = await listMenuItems(truck_id);

    res.status(200).json({ menuItems });
  } catch (error) {
    console.error('Error retrieving menu items:', error);
    res.status(500).json({ error: 'Failed to retrieve menu items' });
  }
});

// Route: GET /api/menu_items/:itemId
// Get details of a specific menu item by ID
router.get('/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;

    // Get the menu item details by ID
    const itemDetails = await getItemByIdQuery(itemId);

    res.status(200).json({ itemDetails });
  } catch (error) {
    console.error('Error retrieving menu item details:', error);
    res.status(500).json({ error: 'Failed to retrieve menu item details' });
  }
});

module.exports = router;
