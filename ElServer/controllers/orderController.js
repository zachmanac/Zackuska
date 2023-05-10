const Order = require('../models/order');
const { validationResult } = require('express-validator');

// Middleware for validating order's input
const validateOrderInput = [
    body('customerName').notEmpty().withMessage('Customer name is required.'),
    body('foodTruckName').notEmpty().withMessage('Food truck name is required.'),
    body('menuItems').notEmpty().withMessage('Menu Items are required.').isArray({ min: 1 }).withMessage('Menu Items must have at least one item.').custom((value) => {
      for (let i = 0; i < value.length; i++) {
        if (!value[i].itemName || !value[i].quantity) {
          throw new Error('Menu Items must have an item name and a quantity.');
        }
      }
      return true;
    }),
  ];

exports.createOrder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { foodTruckId, customerId, items } = req.body;

    const order = new Order({
      foodTruck: foodTruckId,
      customer: customerId,
      items,
      status: 'placed'
    });

    await order.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('foodTruck customer');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate('foodTruck customer');
    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paid } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    order.status = status || order.status;
    order.paid = paid !== undefined ? paid : order.paid;

    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found.' });
    }
    res.status(204).json({ message: 'Order deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
