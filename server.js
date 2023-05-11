require('dotenv').config();// load .env data into process.env
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 8080;
const session = require('express-session');
const cors = require('cors');

const app = express();

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json()); //parse json request bodies

// Separated Routes for each Resource
//user
const new_user = require('./server/routes/user/add_new_user_route');
const user_with_id = require('./server/routes/user/get_an_user_with_id_route');
const login = require('./server/routes/user/login_route');
const logout = require('./server/routes/user/logout_route');
//api
const trucks = require('./server/routes/api/get_trucks_route');
const new_truck = require('./server/routes/api/add_new_truck_route');
const menu = require('./server/routes/api/get_menu_route');
const new_menu_item = require('./server/routes/api/add_menu_item_route');
const order_for_user = require('./server/routes/api/get_order_for_users_route');
const order_for_truck = require('./server/routes/api/get_order_for_trucks_route');
const reviews_for_truck = require('./server/routes/api/get_reviews_for_trucks_route');
const reviews_for_items = require('./server/routes/api/get_reviews_for_items_route');
/*
const menu_items_by_label= require('./server/routes/api/get_menu_items_given_food_route'); items by label*/


//All resource routes
//user
app.post('/api/users', new_user);// Add a new user***
app.post('/api/session', login);// User Login***
app.delete('/api/session', logout);// User logout**
app.get('/api/me', user_with_id); //get an user with a given id**

//api
app.get('/api/trucks', trucks);//Fetch all trucks from the database
app.post('/api/trucks', new_truck);//Create a new truck record in the database
app.get('/api/trucks/:trucks_id/menu_items', menu);// Get the menu of a given truck
//need to add active and stock for inventory
app.post('/api/trucks/:trucks_id/menu_items', new_menu_item);//Create a new menu item record in the database 
app.get('/api/orders', order_for_user);//all the orders of the user given 
app.get('/api/trucks/:truck_id/orders', order_for_truck);//all the orders of the truck given 
app.get('/api/trucks/:truck_id/reviews', reviews_for_truck);//all the reviews of the truck given 
app.get('/api/menu_items/:item_id/reviews', reviews_for_items);//all the reviews of the menu_item
/*

*********STILL TO DO******************************************
REFACTOR THE CODE OF BACK END
app.get('/api/cart/', get_cart);//in case is done in back-end get the object with the items of the cart
app.put('/api/menu_items/:menu_id', retire_menu_item);//retired menu item boolean colum 
app.put('/api/cart/', add_items_to_cart);
app.post('/api/cart/checkout', new_order);

****************STRETCH*************************************
//app.get('/api/:label/menu_items', menu_items_by_label);//STRETCH Fetch menu_items from the database with that label
app.get('/api/labels/:label_id/trucks', menu_items_by_label);//NOT Fetch menu_items from the database with that label maybe NOT*/





app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});