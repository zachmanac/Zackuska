const User = require('../models/user');
const FoodTruck = require('../models/foodTruck');
const Order = require('../models/order');
const logger = require('morgan');

exports.getStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments({});
    const truckCount = await FoodTruck.countDocuments({});
    const orderCount = await Order.countDocuments({});
    const activeTruckCount = await FoodTruck.countDocuments({ approved: true });

    const stats = {
      userCount,
      truckCount,
      orderCount,
      activeTruckCount
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

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.remove();

    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};

// Logging middleware
exports.loggingMiddleware = logger('tiny');
