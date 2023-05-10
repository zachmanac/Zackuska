// Import necessary packages
const express = require('express');
const cors = require('cors');
const database = require('./config/database');

// Import routes
const adminRoutes = require('./routes/adminRoutes');
const customerRoutes = require('./routes/customerRoutes');
const foodTruckRoutes = require('./routes/foodTruckRoutes');
const labelRoutes = require('./routes/labelRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
const orderRoutes = require('./routes/orderRoutes');
const promotionRoutes = require('./routes/promotionRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const promotionRoutes = require('./routes/promotionRoutes');
const truckOwnerRoutes = require('./routes/truckOwnerRoutes');

// Initialize express app
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Database setup
database.connect();

// Routes setup
app.use('/api/admins', adminRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/food-trucks', foodTruckRoutes);
app.use('/api/labels', labelRoutes);
app.use('/api/menu-items', menuItemRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/truck-owners', truckOwnerRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
