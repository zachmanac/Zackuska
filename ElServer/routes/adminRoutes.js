const express = require('express');
const { body } = require('express-validator');
const orderController = require('../controllers/orderController');
const foodTruckController = require('../controllers/foodTruckController');
const menuItemController = require('../controllers/menuItemController');
const promotionController = require('../controllers/promotionController');
const reviewController = require('../controllers/reviewController');
const router = express.Router();

// Routes for orders
router.post('/orders', [
  body('foodTruckId').notEmpty().isString(),
  body('customerId').notEmpty().isString(),
  body('status').notEmpty().isString(),
  body('paymentMethod').notEmpty().isString(),
  body('items').isArray(),
], orderController.createOrder);

router.get('/orders', orderController.getAllOrders);

router.get('/orders/:id', orderController.getOrderById);

router.put('/orders/:id', [
  body('status').notEmpty().isString(),
  body('paymentMethod').notEmpty().isString(),
], orderController.updateOrder);

router.delete('/orders/:id', orderController.deleteOrder);

// Routes for food trucks
router.post('/foodtrucks', [
  body('name').notEmpty().isString(),
  body('description').notEmpty().isString(),
  body('imageUrl').notEmpty().isString(),
], foodTruckController.createFoodTruck);

router.get('/foodtrucks', foodTruckController.getAllFoodTrucks);

router.get('/foodtrucks/:id', foodTruckController.getFoodTruckById);

router.put('/foodtrucks/:id', [
  body('name').notEmpty().isString(),
  body('description').notEmpty().isString(),
  body('imageUrl').notEmpty().isString(),
], foodTruckController.updateFoodTruck);

router.delete('/foodtrucks/:id', foodTruckController.deleteFoodTruck);

// Routes for menu items
router.post('/menuitems', [
  body('foodTruckId').notEmpty().isString(),
  body('name').notEmpty().isString(),
  body('description').notEmpty().isString(),
  body('price').notEmpty().isNumeric(),
  body('active').optional().isBoolean(),
  body('hidden').optional().isBoolean(),
  body('dailyLimit').optional().isNumeric(),
], menuItemController.createMenuItem);

router.get('/menuitems', menuItemController.getAllMenuItems);

router.get('/menuitems/:id', menuItemController.getMenuItemById);

router.put('/menuitems/:id', [
  body('foodTruckId').notEmpty().isString(),
  body('name').notEmpty().isString(),
  body('description').notEmpty().isString(),
  body('price').notEmpty().isNumeric(),
  body('active').optional().isBoolean(),
  body('hidden').optional().isBoolean(),
  body('dailyLimit').optional().isNumeric(),
], menuItemController.updateMenuItem);

router.delete('/menuitems/:id', menuItemController.deleteMenuItem);

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
  
  // Routes for menu items
  router.post('/menuItems', [
  body('foodTruckId').notEmpty().isString(),
  body('name').notEmpty().isString(),
  body('description').notEmpty().isString(),
  body('price').notEmpty().isNumeric(),
  body('category').notEmpty().isString(),
  body('active').optional().isBoolean(),
  body('hidden').optional().isBoolean(),
  body('dailyLimit').optional().isNumeric(),
  ], menuItemController.createMenuItem);
  
  router.get('/menuItems', menuItemController.getAllMenuItems);
  
  router.get('/menuItems/:id', menuItemController.getMenuItemById);
  
  router.put('/menuItems/:id', [
  body('name').notEmpty().isString(),
  body('description').notEmpty().isString(),
  body('price').notEmpty().isNumeric(),
  body('category').notEmpty().isString(),
  body('active').optional().isBoolean(),
  body('hidden').optional().isBoolean(),
  body('dailyLimit').optional().isNumeric(),
  ], menuItemController.updateMenuItem);
  
  router.delete('/menuItems/:id', menuItemController.deleteMenuItem);
  
  // Routes for orders
  router.post('/orders', [
  body('customerId').notEmpty().isString(),
  body('foodTruckId').notEmpty().isString(),
  body('items').notEmpty().isArray(),
  body('totalPrice').notEmpty().isNumeric(),
  body('status').notEmpty().isString(),
  ], orderController.createOrder);
  
  router.get('/orders', orderController.getAllOrders);
  
  router.get('/orders/:id', orderController.getOrderById);
  
  router.put('/orders/:id', [
  body('status').notEmpty().isString(),
  ], orderController.updateOrder);
  
  router.delete('/orders/:id', orderController.deleteOrder);
  
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

  router.delete('/foodtrucks/:id/admin', adminController.deleteFoodTruckAdmin);

  module.exports = router;
