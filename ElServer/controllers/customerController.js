const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { Customer } = require('../models');
const morgan = require('morgan');

// Middleware for validating customer's input
const validateCustomerInput = [ 
  // validation rules here 
];

// Register a new customer
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { firstName, lastName, email, password } = req.body;
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(422).json({ errors: [{ msg: 'Email is already registered' }] });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const customer = new Customer({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });
    const savedCustomer = await customer.save();
    res.status(201).json({ msg: 'Customer registered successfully.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Login a customer
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return res.status(401).json({ errors: [{ msg: 'Invalid credentials' }] });
    }
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(401).json({ errors: [{ msg: 'Invalid credentials' }] });
    }
    const token = jwt.sign({ id: customer._id }, config.jwt.secret, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get all customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get a customer by ID
exports.getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }
    res.status(200).json(customer);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Update a customer by ID
exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!customer) {
      return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
    }
    res.status(200).json(customer);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Delete a customer by ID
exports.deleteCustomer = async (req, res) => {
    try {
      const customer = await Customer.findByIdAndDelete(req.params.id);
      if (!customer) {
        return res.status(404).json({ errors: [{ msg: 'Customer not found' }] });
      }
      res.status(200).json({ msg: 'Customer deleted successfully.' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  };

  