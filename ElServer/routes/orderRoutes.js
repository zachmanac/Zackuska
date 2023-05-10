const express = require('express');
const { body } = require('express-validator');
const orderController = require('../controllers/orderController');
const router = express.Router();

// Routes for orders
router.post('/orders', [
  body('foodTruckId').notEmpty().isString(),
  body('customerId').notEmpty().isString(),
  body('status').notEmpty().isString(),
  body('paymentMethod').notEmpty().isString(),
  body('menuItems').isArray(),
], orderController.createOrder);

router.get('/orders', orderController.getAllOrders);

router.get('/orders/:id', orderController.getOrderById);

router.put('/orders/:id', [
  body('status').notEmpty().isString(),
  body('paymentMethod').notEmpty().isString(),
], orderController.updateOrder);

router.delete('/orders/:id', orderController.deleteOrder);

module.exports = router;
