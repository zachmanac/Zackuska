const express = require('express');
const router = express.Router();
const add_new_truck = require('../database/queries/add_new_truck');

//need to validate the truck before adding
router.post('/api/trucks', (req, res) => {
  console.log("new truck params", req.body)
  const new_truck = req.body;

  add_new_truck(new_truck.owner_id, new_truck.truck_name, new_truck.phone_number, new_truck.cuisine, new_truck.instagram, new_truck.facebook, new_truck.picture)

    .then(() => {
      console.log("Truck added sucessfully")

    })
    .catch(e => {
      console.error("Fail to add new truck to database", e);
      res.send(e)
    });


});

module.exports = router;


