const express = require('express');
const router = express.Router();
const query = require('../../database/queries/add_new_truck');

//need to validate the truck before adding
router.post('/api/trucks', (req, res) => {
  console.log("new truck params", req.body)
  const new_truck = req.body;

  query(new_truck.owner_id, new_truck.truck_name, new_truck.phone_number, new_truck.cuisine, new_truck.instagram, new_truck.facebook, new_truck.picture, new_truck.city)

    .then(() => {
      console.log("Truck added sucessfully")
      res.send("Truck added");

    })
    .catch(e => {
      console.error("Fail to add new truck to database", e);
      res.send(e)
    });


});

module.exports = router;


