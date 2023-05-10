const express = require('express');
const { body } = require('express-validator');
const reviewController = require('../controllers/reviewController');
const router = express.Router();

// Routes for reviews
router.post('/reviews', [
    body('customerId').notEmpty().isString(),
    body('foodTruckId').notEmpty().isString(),
    body('rating').notEmpty().isNumeric(),
    body('comment').notEmpty().isString(),
    ], reviewController.createReview);
    
    router.get('/reviews', reviewController.getAllReviews);
    
    router.get('/reviews/:id', reviewController.getReviewById);
    
    router.put('/reviews/:id', [
    body('rating').notEmpty().isNumeric(),
    body('comment').notEmpty().isString(),
    body('customerId').notEmpty().isString(),
    body('foodTruckId').notEmpty().isString(),
    ], reviewController.updateReview);
    
    router.delete('/reviews/:id', reviewController.deleteReview);
    
    module.exports = router;
    
    
    
    