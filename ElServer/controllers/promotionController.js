const Promotion = require('../models/promotion');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

// Middleware for validating promotion's input
const validatePromotionInput = [
  body('title').notEmpty().withMessage('Title is required.').isLength({ min: 3 }).withMessage('Title must be at least 3 characters long.'),
  body('description').notEmpty().withMessage('Description is required.').isLength({ min: 10 }).withMessage('Description must be at least 10 characters long.'),
  body('foodTruckId').notEmpty().withMessage('Food Truck ID is required.').isMongoId().withMessage('Food Truck ID is not valid.'),
];

exports.createPromotion = [validatePromotionInput, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const promotion = new Promotion(req.body);
    await promotion.save();
    res.status(201).json(promotion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}];

exports.getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find().populate('foodTruckId');
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPromotionById = async (req, res) => {
  try {
    const { id } = req.params;
    const promotion = await Promotion.findById(id).populate('foodTruckId');
    if (!promotion) {
      return res.status(404).json({ error: 'Promotion not found.' });
    }
    res.json(promotion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePromotion = [validatePromotionInput, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const updatedPromotion = await Promotion.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPromotion) {
      return res.status(404).json({ error: 'Promotion not found.' });
    }
    res.json(updatedPromotion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}];

exports.deletePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPromotion = await Promotion.findByIdAndDelete(id);
    if (!deletedPromotion) {
      return res.status(404).json({ error: 'Promotion not found.' });
    }
    res.status(204).json({ message: 'Promotion deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
