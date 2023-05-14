require('dotenv').config();// load .env data into process.env
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 8080;
const session = require('express-session');
const cors = require('cors');
const cookieParser= require('cookie-parser');
const app = express();
//app.use(cookieParser());
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
//user
const new_user = require('./server/routes/user/add_new_user_route');
const user_with_id = require('./server/routes/user/get_an_user_with_id_route');
const loginUser = require('./server/routes/user/login_route');
const logout = require('./server/routes/user/logout_route');
//api
const trucks = require('./server/routes/truck/get_trucks_route');
const new_truck = require('./server/routes/truck/add_new_truck_route');
const menu = require('./server/routes/menu/get_menu_route');
const new_menu_item = require('./server/routes/menu/add_menu_item_route');
const order_for_user = require('./server/routes/order/get_order_for_users_route');
const order_for_truck = require('./server/routes/order/get_order_for_trucks_route');
const reviews_for_truck = require('./server/routes/review/get_reviews_for_trucks_route');
const add_reviews_for_truck= require('./server/routes/review/add_reviews_for_trucks_route');
const reviews_for_items = require('./server/routes/review/get_reviews_for_items_route');
const add_reviews_for_items= require('./server/routes/review/add_reviews_for_items_route');
const schedule = require('./server/routes/schedule/get_schedule_route');
const new_schedule = require('./server/routes/schedule/add_schedule_route');
const order_accepted_declined= require('./server/routes/order/order_accepted_or_declined_by_the_truck_route');
const new_order= require('./server/routes/order/add_new_order_route');
const create_cart= require('./server/routes/cart/create_cart_route');
const revert_order= require('./server/routes/order/revert_order_route')
//All resource routes
//user
app.post('/api/users', new_user);// Add a new user***
app.post('/api/session', loginUser);// User Login***
app.delete('/api/session', logout);// User logout**
app.get('/api/me', user_with_id); //get an user with a given id**

//api
app.get('/api/trucks', trucks);//Fetch all trucks from the database
app.post('/api/trucks', new_truck);//Create a new truck record in the database
app.get('/api/trucks/:trucks_id/menu_items', menu);// Get the menu of a given truck
//need to add active and stock for inventory
app.post('/api/trucks/:truck_id/menu_items', new_menu_item);//Create a new menu item record in the database 
app.get('/api/orders', order_for_user);//all the orders of the user given 
app.get('/api/trucks/:truck_id/orders', order_for_truck);//all the orders of the truck given 
app.get('/api/trucks/:truck_id/reviews', reviews_for_truck);//all the reviews of the truck given 
app.post('/api/trucks/:truck_id/reviews', add_reviews_for_truck);//new  reviews of the truck 
app.get('/api/menu_items/:item_id/reviews', reviews_for_items);//all the reviews of the menu_item
app.post('/api/menu_items/:item_id/reviews', add_reviews_for_items);//new reviews of the menu_item
app.get('/api/trucks/:truck_id/schedules', schedule);// Get the schedule of a given truck
//need to add active and stock for inventory
app.post('/api/trucks/:truck_id/schedules', new_schedule);//Create a new schedule itenerary record in the database 
app.post('/api/cart/checkout', new_order);
app.post('/api/cart', create_cart);
app.get('/api/cart', (req, res)=>{res.status(200).json(req.session.cart||{})});
app.put('/api/cart/', (req,res)=>{
  if(!req.session.cart){
  req.session.cart={};
}
req.session.cart.truck_id= req.body.truck_id;
req.session.cart.menu_items= req.body.menu_items;
  //keys are menu_items_id  values are quantities
  res.status(200).json(req.session.cart)
});
app.post('/api/orders/:order_id/submit', order_accepted_declined);
//app.post('/api/orders/:order_id/revert', revert_order);
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

app.put('/api/menu_items/:menu_id', retire_menu_item);//retired menu item boolean colum 



****************STRETCH*************************************
/*
const menu_items_by_label= require('./server/routes/api/get_menu_items_given_food_route'); items by label

//app.get('/api/:label/menu_items', menu_items_by_label);//STRETCH Fetch menu_items from the database with that label
app.get('/api/labels/:label_id/trucks', menu_items_by_label);//NOT Fetch menu_items from the database with that label maybe NOT*/


app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
