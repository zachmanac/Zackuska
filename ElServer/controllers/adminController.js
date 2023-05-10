const User = require('../models/customer');
const FoodTruck = require('../models/foodTruck');
const Order = require('../models/order');
const Promo = require('../models/promotion');
const Review = require('../models/review');
const Label = require('../models/label');
const MenuItem = require('../models/menuItem');
const logger = require('morgan');

exports.getStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments({});
    const truckCount = await FoodTruck.countDocuments({});
    const orderCount = await Order.countDocuments({});
    const activeTruckCount = await FoodTruck.countDocuments({ approved: true });
    const promoCount = await Promo.countDocuments({});
    const reviewCount = await Review.countDocuments({});
    const labelCount = await Label.countDocuments({});
    const itemsCount = await MenuItem.countDocuments({});

    const stats = {
      userCount,
      truckCount,
      orderCount,
      activeTruckCount,
      promoCount,
      reviewCount,
      labelCount,
      itemsCount
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Error getting stats' });
  }
};

exports.approveTruck = async (req, res) => {
  try {
    const { id } = req.params;
    const foodTruck = await FoodTruck.findById(id);

    if (!foodTruck) {
      return res.status(404).json({ error: 'Food Truck not found' });
    }

    foodTruck.approved = true;
    await foodTruck.save();

    res.json({ message: 'Food Truck approved' });
  } catch (error) {
    res.status(500).json({ error: 'Error approving Food Truck' });
  }
};

exports.deleteFoodTruckAdmin = async (req, res) => {
    try {
      const { id } = req.params;
      const foodTruck = await FoodTruck.findById(id);
  
      if (!foodTruck) {
        return res.status(404).json({ error: 'Food Truck not found' });
      }
  
      await foodTruck.remove();
  
      res.json({ message: 'Food Truck deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting Food Truck' });
    }
  };
  

// Logging middleware
exports.loggingMiddleware = logger('tiny');
