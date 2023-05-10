const express = require('express');
const { body } = require('express-validator');
const foodTruckController = require('../controllers/foodTruckController');

const router = express.Router();

// Middleware for validating food truck's input
const validateFoodTruckInput = [
  body('name').notEmpty().withMessage('Name is required.').isString().withMessage('Name must be a string.'),
  body('description').notEmpty().withMessage('Description is required.').isString().withMessage('Description must be a string.'),
  body('location.longitude').notEmpty().withMessage('Longitude is required.').isNumeric().withMessage('Longitude must be a number.'),
  body('location.latitude').notEmpty().withMessage('Latitude is required.').isNumeric().withMessage('Latitude must be a number.'),
  body('imageUrl').isURL().withMessage('Invalid image URL.'),
  body('menuItems').isArray().withMessage('Menu items must be an array.'),
];

router.post('/foodTrucks', validateFoodTruckInput, foodTruckController.createFoodTruck);

router.get('/foodTrucks', foodTruckController.getAllFoodTrucks);

router.get('/foodTrucks/:id', foodTruckController.getFoodTruckById);

router.put('/foodTrucks/:id', validateFoodTruckInput, foodTruckController.updateFoodTruck);

router.delete('/foodTrucks/:id', foodTruckController.deleteFoodTruck);

module.exports = router;
