const express = require('express');
const { body } = require('express-validator');
const promotionController = require('../controllers/promotionController');
const router = express.Router();


// Routes for promotions
router.post('/promotions', [
  body('foodTruckId').notEmpty().isString(),
  body('name').notEmpty().isString(),
  body('description').notEmpty().isString(),
  body('discount').notEmpty().isNumeric(),
  body('startDate').notEmpty().isString(),
  body('endDate').notEmpty().isString(),
], promotionController.createPromotion);

router.get('/promotions', promotionController.getAllPromotions);

router.get('/promotions/:id', promotionController.getPromotionById);

router.put('/promotions/:id', [
  body('name').notEmpty().isString(),
  body('description').notEmpty().isString(),
  body('discount').notEmpty().isNumeric(),
  body('startDate').notEmpty().isString(),
  body('endDate').notEmpty().isString(),
  ], promotionController.updatePromotion);
  
  router.delete('/promotions/:id', promotionController.deletePromotion);
