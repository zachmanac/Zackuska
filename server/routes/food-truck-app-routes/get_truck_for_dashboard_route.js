const express = require('express');
const router = express.Router();
const queryTruckDashboard= require('../../database/queries/truck/get_trucks_for_dashboard');
const {queryCheckExistingTruck} = require('../../database/queries/truck/add_new_truck');

//get the trucks from the database
//in this case we are getting the owner_id from the session just didnt work for me at the moment so i hardcode for owner_id=2 for now
router.get('/api/trucks/dashboard', async (req, res) => {
  //const truck_owner_id= req.session.userId;
const owner_id= 2;//hardcode owner_id until it is stored in session
const truck= await queryCheckExistingTruck(owner_id);//get the truck for that owner
console.log('Truck existing', truck);
if(!truck){res.send('please add your truck');}
  queryTruckDashboard(truck.truck_id)
    .then((truck_info) => {
      console.log("TRUCK INFO", truck_info);
      res.send(truck_info);
    })
    .catch(e => {
      console.error("Failed to fetch truck from the database", e);
      res.send(e);
    });
});


module.exports = router;