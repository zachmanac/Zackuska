// load .env data into process.env
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 8080;
const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json()); //parse json request bodies

// Separated Routes for each Resource
const trucks= require('./server/api/get_trucks_route');
const menu= require('./server/api/get_menu_route');
const new_user= require('./server/api/add_new_user_route');
const new_truck= require('./server/api/add_new_truck_route');

//All resource routes
app.get('/api/trucks', trucks);
app.get('/api/:truck_id/menu', menu);
app.post('/api/users', new_user);
app.post('/api/trucks', new_truck);

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
