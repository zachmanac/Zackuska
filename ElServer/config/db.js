const express = require('express');
const router = express.Router();

const customersController = require('./controllers/customerController');
const foodTrucksController = require('./controllers/foodTruckController');
const orderController = require('./controllers/orderController');
const reviewController = require('./controllers/reviewController');
const promotionController = require('./controllers/promotionController');
const menuItemController = require('./controllers/menuItemController');
const truckOwnerController = require('./controllers/truckOwnerController');
const labelController = require('./controllers/labelController');
const adminController = require('./controllers/adminController');


router.use('/customers', customersController);
router.use('/foodTrucks', foodTrucksController);
router.use('/orders', orderController);
router.use('/reviews', reviewController);
router.use('/promotions', promotionController);
router.use('/menuItems', menuItemController);
router.use('/truckOwners', truckOwnerController);
router.use('/labels', labelController);
router.use('/admins', adminController);


module.exports = router;