const FoodTruck = require('../models/foodTruck');
const { validationResult } = require('express-validator');

// Middleware for validating food truck's input
const validateFoodTruckInput = [
  // validate input using express-validator
  body('name').trim().isLength({ min: 1 }).withMessage('Name is required.'),
  body('location').trim().isLength({ min: 1 }).withMessage('Location is required.'),
  // additional validation logic here (e.g. check location format, name characters, etc.)
];

exports.createFoodTruck = [validateFoodTruckInput, async (req, res) => {
  try {
    // check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const foodTruck = new FoodTruck(req.body);
    await foodTruck.save();
    res.status(201).json(foodTruck);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}];

exports.getAllFoodTrucks = async (req, res) => {
  try {
    const foodTrucks = await FoodTruck.find();
    res.json(foodTrucks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFoodTruckById = async (req, res) => {
  try {
    const { id } = req.params;
    const foodTruck = await FoodTruck.findById(id);
    if (!foodTruck) {
      return res.status(404).json({ error: 'Food truck not found.' });
    }
    res.json(foodTruck);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateFoodTruck = [validateFoodTruckInput, async (req, res) => {
  try {
    // check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const updatedFoodTruck = await FoodTruck.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedFoodTruck) {
      return res.status(404).json({ error: 'Food truck not found.' });
    }
    res.json(updatedFoodTruck);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}];

exports.deleteFoodTruck = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFoodTruck = await FoodTruck.findByIdAndDelete(id);
    if (!deletedFoodTruck) {
      return res.status(404).json({ error: 'Food truck not found.' });
    }
    res.status(204).json({ message: 'Food truck deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
