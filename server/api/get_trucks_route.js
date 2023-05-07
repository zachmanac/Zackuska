const express = require('express');
const router = express.Router();
const listTrucks= require('../database/queries/get_trucks');

//get the trucks from the database, need to use the map api

router.get('/api/trucks', (req, res) => {
listTrucks()

.then(trucks=>{
  
  console.log('TRUCKS', trucks)})// trucks is a list of trucks from database

     .catch(e => {
      console.error("Get Trucks Error",e);
      res.send(e)
    });


});

module.exports = router;