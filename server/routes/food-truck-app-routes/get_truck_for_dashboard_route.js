const express = require('express');
const router = express.Router();
const queryTruckDashboard= require('../../database/queries/truck/get_trucks_for_dashboard');
const {queryCheckExistingTruck} = require('../../database/queries/truck/add_new_truck');

//get the trucks from the database

router.get('/api/trucks/dashboard', async (req, res) => {
  console.log("reqsession before ownerid", req.session);
  const owner_id = req.session.userid;
  console.log("ownerid", owner_id);

const truck = await queryCheckExistingTruck(owner_id);//get the truck for that owner
console.log("truck", truck)
if (truck) {res.status(200).json(truck);}
else {res.status(400).json({error: 'No truck found for this owner'});}
});


module.exports = router;