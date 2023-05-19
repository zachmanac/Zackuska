require('dotenv').config();// load .env data into process.env
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 8080;
const session = require('express-session');
const cors = require('cors');
const pgSession = require('connect-pg-simple')(session);
const app = express();
const pool = require('./server/database/connection');

app.use(cors({
  origin: 'http://localhost:3000', // replace with your client-side domain
  credentials: true
}));

app.use(
  session({
    store: new pgSession({
      pool,
      tableName: 'session',
    }),
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 24 * 60 * 60 * 1000, // Set the session cookie expiration time
    },
  })
);

app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Set to true if using HTTPS
    maxAge: 86400000 // Session expiration time (e.g., 24 hours)
  }
}));
app.use((req, res, next) => {
  console.log('Session ID:', req.sessionID);
  console.log('Session:', req.session);
  next();
});

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json()); //parse json request bodies


// Separated Routes for each Resource

//Payment
const paymentRoutes = require('./server/routes/customer-app-routes/paymentRoutes');
app.use('/api/payment', paymentRoutes);


//user
const new_user = require('./server/routes/user/add_new_user_route');
const user_with_id = require('./server/routes/user/get_an_user_with_id_route');
const loginUser = require('./server/routes/user/login_route');
const logout = require('./server/routes/user/logout_route');
const user_with_email = require('./server/routes/user/get_an_user_with_email_route');
const user_session = require('./server/routes/user/get_user_session_route');
//api
const trucks = require('./server/routes/food-truck-app-routes/get_trucks_route');
const new_truck = require('./server/routes/food-truck-app-routes/add_new_truck_route');
const menu = require('./server/routes/food-truck-app-routes/get_menu_route');
const new_menu_item = require('./server/routes/food-truck-app-routes/add_menu_item_route');
const order_for_user = require('./server/routes/customer-app-routes/get_order_for_users_route');
const order_for_truck = require('./server/routes/food-truck-app-routes/get_order_for_trucks_route');
const reviews_for_truck = require('./server/routes/customer-app-routes/get_reviews_for_trucks_route');
const add_reviews_for_truck= require('./server/routes/customer-app-routes/add_reviews_for_trucks_route');
const reviews_for_items = require('./server/routes/customer-app-routes/get_reviews_for_items_route');
const add_reviews_for_items= require('./server/routes/customer-app-routes/add_reviews_for_items_route');
const schedule = require('./server/routes/customer-app-routes/get_schedule_route');
const new_schedule = require('./server/routes/food-truck-app-routes/add_schedule_route');
const new_order= require('./server/routes/customer-app-routes/add_new_order_route');
const create_cart= require('./server/routes/customer-app-routes/create_cart_route');
const get_truck_by_owner_id= require('./server/routes/food-truck-app-routes/get_truck_for_dashboard_route');
const order_accepted_by_truck= require('./server/routes/food-truck-app-routes/order_accepted_by_truck_route');
const order_declined_by_truck= require('./server/routes/food-truck-app-routes/order_declined_by_truck_route');
const pending_orders_for_truck= require('./server/routes/food-truck-app-routes/get_pending_orders_for_truck_route');
const get_order_status_for_customer= require('./server/routes/customer-app-routes/get_status_order_for_customer');
const customer_cancel_order= require('./server/routes/customer-app-routes/customer_cancel_order_route');
const order_ready= require('./server/routes/food-truck-app-routes/order_ready_route');

//All resource routes
//user
app.post('/api/users', new_user);// Add a new user*
app.get('/api/user/', user_with_email);// Get an user with a given email*
app.post('/api/session', loginUser);// User Login*
app.delete('/api/session', logout);// User logout*
app.get('/api/me', user_with_id); //didnt work for curl Get an user with a given id*

//api
//food-truck-app
app.post('/api/trucks/:order_id/accepted',order_accepted_by_truck);
app.post('/api/trucks/:order_id/declined',order_declined_by_truck);
app.get('/api/trucks/:truck_id/pending_orders', pending_orders_for_truck);//get all pending orders for truck*
app.get('/api/trucks', trucks);//Fetch all trucks from the database*
app.post('/api/trucks', new_truck);//Create a new truck record in the database needs validate user_type to owner*
app.get('/api/trucks/:truck_id/menu_items', menu);// Get the menu of a given truck*
app.post('/api/trucks/:truck_id/menu_items', new_menu_item);//Create a new menu item record in the database* 
app.get('/api/orders', order_for_user);//all the orders of the user given* 
app.get('/api/trucks/:truck_id/orders', order_for_truck);//all the orders of the truck given* 
app.get('/api/trucks/:truck_id/reviews', reviews_for_truck);//all the reviews of the truck given* 
app.post('/api/trucks/:truck_id/reviews', add_reviews_for_truck);//new  reviews of the truck 
app.get('/api/menu_items/:item_id/reviews', reviews_for_items);//all the reviews of the menu_item
app.post('/api/menu_items/:item_id/reviews', add_reviews_for_items);//new reviews of the menu_item
//app.put('/api/menuItems/:item_id', update_menu_item); //edit menuitem
app.post('/api/cart/checkout', new_order);//*
app.post('/api/cart', create_cart);
app.get('/api/cart', (req, res)=>{res.status(200).json(req.session.cart||{})});
app.put('/api/cart', (req,res)=>{
  if(!req.session.cart){
  req.session.cart={};
}
req.session.cart.truck_id= req.body.truck_id;
req.session.cart.menu_items= req.body.menu_items;
  //keys are menu_items_id  values are quantities
  res.status(200).json(req.session.cart)
});
app.post('/api/trucks/orders', send_order_to_the_truck);
app.get('/api/trucks/dashboard', get_truck_by_owner_id);
app.post('/api/trucks/:truck_id/:order_id/cancelled',customer_cancel_order);
app.post('/api/trucks/:truck_id/:order_id/ready',order_ready);


//**************************************************************************
// Cart Routes
/*const get_cart = require('./server/routes/cart/get_cart_for_user'); //get the cart for a given user_id
const add_items_to_cart = require('./server/routes/cart/add_new_cart_for_user');
const delete_item_cart = require('./server/routes/cart/delete_item_cart_for_user');
const update_cart_item = require('./server/routes/cart/update_item_quantity_cart_for_user');
const new_order = require('./server/routes/order/add_new_order_route');
//app.get('/api/cart/:cart_id', get_cart);
app.delete('/api/cart/:cart_id/cart_items/:cart_item_id', delete_item_cart);
app.put('/api/cart/:cart_id/cart_items/:cart_item_id', update_cart_item);
/*

*********STILL TO DO******************************************
REFACTOR THE CODE OF BACK END
MAKE SURE THERE IS ONLY ONE TRUCK PER OWNER IN YOUR DB for now
i need to validate the user_type is owner in login for dashboard

****************STRETCH*************************************
//const revert_order= require('./server/routes/order/revert_order_route');
//app.post('/api/orders/:order_id/revert', revert_order);
app.get(/api/trucks/stats', truck_stats)//truck owner could see charts of their sales
app.get(/api/trucks/inventory', truck_inventory)//can see the inventory
*/

app.use('/api', userRoutes);// Users Routes


app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
