const Review = require('../models/review');
const { body } = require('express-validator');
const { validationResult } = require('express-validator');
const logger = require('morgan');

// Middleware for validating review's input
const validateReviewInput = [
  body('rating').notEmpty().withMessage('Rating is required.').isInt({ min: 1, max: 5 }).withMessage('Rating must be a number between 1 and 5.'),
  body('comment').notEmpty().withMessage('Comment is required.').isLength({ max: 500 }).withMessage('Comment must be at most 500 characters.'),
//   body('customerId').notEmpty().withMessage('Customer ID is required.').isMongoId().withMessage('Customer ID is not valid.'),
//   body('foodTruckId').notEmpty().withMessage('Food Truck ID is required.').isMongoId().withMessage('Food Truck ID is not valid.')
  body('customerName').notEmpty().withMessage('Customer name is required.'),
  body('foodTruckName').notEmpty().withMessage('Food truck name is required.'),
//   body('menuItems').notEmpty().withMessage('Menu Items are required.').isArray({ min: 1 }).withMessage('Menu Items must have at least one item.').custom((value) => {
];

exports.createReview = [validateReviewInput, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}];

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('customerId foodTruckId');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id).populate('customerId foodTruckId');
    if (!review) {
      return res.status(404).json({ error: 'Review not found.' });
    }
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateReview = [validateReviewInput, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReview = await Review.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedReview) {
      return res.status(404).json({ error: 'Review not found.' });
    }
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}];

exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
      return res.status(404).json({ error: 'Review not found.' });
    }
    res.status(204).json({ message: 'Review deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
