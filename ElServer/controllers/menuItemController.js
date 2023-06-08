const MenuItem = require('../models/menuItem');
const { body, validationResult } = require('express-validator');

// Middleware for validating menu item's input
const validateMenuItemInput = [
  body('name').notEmpty().trim().escape(),
  body('price').isDecimal(),
  body('description').notEmpty().trim().escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

exports.createMenuItem = [validateMenuItemInput, async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}];

exports.getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMenuItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await MenuItem.findById(id);
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found.' });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMenuItem = [validateMenuItemInput, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedMenuItem) {
      return res.status(404).json({ error: 'Menu item not found.' });
    }
    res.json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}];

exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMenuItem = await MenuItem.findByIdAndDelete(id);
    if (!deletedMenuItem) {
      return res.status(404).json({ error: 'Menu item not found.' });
    }
    res.status(204).json({ message: 'Menu item deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
