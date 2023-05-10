const express = require('express');
const { body } = require('express-validator');
const customerController = require('../controllers/customerController');
const router = express.Router();

// Middleware for validating customer's input
const validateCustomerInput = [
  body('name').notEmpty().withMessage('Name is required.'),
  body('email').notEmpty().withMessage('Email is required.').isEmail().withMessage('Invalid email address.'),
  body('password').notEmpty().withMessage('Password is required.'),
  // Additional input validation logic here (e.g. check password strength, etc.)
];

// Routes for customers
router.post('/customers', validateCustomerInput, customerController.createCustomer);

router.get('/customers', customerController.getAllCustomers);

router.get('/customers/:id', customerController.getCustomerById);

router.put('/customers/:id', validateCustomerInput, customerController.updateCustomer);

router.delete('/customers/:id', customerController.deleteCustomer);

module.exports = router;
