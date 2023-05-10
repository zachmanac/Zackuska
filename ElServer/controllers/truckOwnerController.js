const TruckOwner = require('../models/truckOwner');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');

const saltRounds = 10;

// Get all truck owners
exports.getTruckOwners = async (req, res) => {
  try {
    const truckOwners = await TruckOwner.find();
    res.status(200).json(truckOwners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a truck owner by ID
exports.getTruckOwner = async (req, res) => {
  try {
    const truckOwner = await TruckOwner.findById(req.params.id);
    res.status(200).json(truckOwner);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Register a new truck owner
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const existingTruckOwner = await TruckOwner.findOne({ username });
    if (existingTruckOwner) {
      return res.status(400).json({ message: 'Username is already taken.' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const truckOwner = new TruckOwner({ username, password: hashedPassword });
    const savedTruckOwner = await truckOwner.save();

    const token = jwt.sign({ truckOwnerId: savedTruckOwner._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(201).json({ token, truckOwnerId: savedTruckOwner._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login a truck owner
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const truckOwner = await TruckOwner.findOne({ username });
    if (!truckOwner) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, truckOwner.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ truckOwnerId: truckOwner._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    res.json({ token, truckOwnerId: truckOwner._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a truck owner by ID
exports.updateTruckOwner = async (req, res) => {
  try {
    const updatedTruckOwner = await TruckOwner.updateOne({ _id: req.params.id }, { $set: req.body });
    res.status(200).json(updatedTruckOwner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a truck owner by ID
exports.deleteTruckOwner = async (req, res) => {
  try {
    const removedTruckOwner = await TruckOwner.remove({ _id: req.params.id });
    res.status(200).json(removedTruckOwner);
  } catch (error) {
    res.status(500).json({ message: error.message });
}
};
