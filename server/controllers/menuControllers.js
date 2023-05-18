const { add_new_menu_item, listMenuItems, getItemByIdQuery } = require('../database/queries/menu');

// Function to add a new menu item
const addMenuItem = async (req, res) => {
  try {
    const { truck_id, item_name, price, calories, allergens, halal, picture, description, item_label, quantity } = req.body;

    // Add the new menu item to the database
    await add_new_menu_item(truck_id, item_name, price, calories, allergens, halal, picture, description, item_label, quantity);

    res.status(201).json({ message: 'New menu item added successfully' });
  } catch (error) {
    console.error('Error adding new menu item:', error);
    res.status(500).json({ error: 'Failed to add new menu item' });
  }
};

// Function to get all menu items for a specific truck
const getMenuItems = async (req, res) => {
  try {
    const { truck_id } = req.params;

    // Retrieve all menu items for the truck
    const menuItems = await listMenuItems(truck_id);

    res.status(200).json({ menuItems });
  } catch (error) {
    console.error('Error retrieving menu items:', error);
    res.status(500).json({ error: 'Failed to retrieve menu items' });
  }
};

// Function to get details of a specific menu item by its ID
const getMenuItemById = async (req, res) => {
  try {
    const { itemId } = req.params;

    // Retrieve the menu item by its ID
    const menuItem = await getItemByIdQuery(itemId);

    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    res.status(200).json({ menuItem });
  } catch (error) {
    console.error('Error retrieving menu item:', error);
    res.status(500).json({ error: 'Failed to retrieve menu item' });
  }
};

module.exports = {
  addMenuItem,
  getMenuItems,
  getMenuItemById,
};
