const express = require('express');
const { body } = require('express-validator');
const menuItemController = require('../controllers/menuItemController');
const router = express.Router();

// Routes for menu items
router.post('/menuItems', [
  body('name').notEmpty().isString(),
  body('description').notEmpty().isString(),
  body('price').notEmpty().isNumeric(),
  body('foodTruckId').notEmpty().isString(),
  body('label').notEmpty().isString(),
  body('active').optional().isBoolean(),
  body('dailyLimit').optional().isNumeric()
], menuItemController.createMenuItem);

router.get('/menuItems', menuItemController.getAllMenuItems);

router.get('/menuItems/:id', menuItemController.getMenuItemById);

router.put('/menuItems/:id', [
  body('name').notEmpty().isString(),
  body('description').notEmpty().isString(),
  body('price').notEmpty().isNumeric(),
  body('foodTruckId').notEmpty().isString(),
  body('label').notEmpty().isString(),
], menuItemController.updateMenuItem);

router.delete('/menuItems/:id', menuItemController.deleteMenuItem);

module.exports = router;