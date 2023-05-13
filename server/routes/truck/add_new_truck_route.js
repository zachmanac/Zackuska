const express = require('express');
const router = express.Router();
const {queryAddNewTruck, queryCheckExistingTruck } = require('../../database/queries/truck/add_new_truck');


router.post('/api/trucks', async (req, res) => {
  try {
    console.log("New truck params", req.body);
    const new_truck = req.body;

    // Check if the truck already exists
    const truckExists = await queryCheckExistingTruck(new_truck.owner_id, new_truck.truck_name, new_truck.phone_number);

    if (truckExists) {
      // Truck already exists
      console.log("Truck already exists");
      res.status(409).send("Truck already exists.");
      return;
    }

    // Proceed to add the new truck
    await queryAddNewTruck(
      new_truck.owner_id,
      new_truck.truck_name,
      new_truck.phone_number,
      new_truck.cuisine,
      new_truck.instagram,
      new_truck.facebook,
      new_truck.picture,
      new_truck.city
    );

    console.log("Truck added successfully");
    res.status(200).send("Truck added");
  } catch (error) {
    console.error("Failed to add new truck", error);
    res.status(500).send("An error occurred while adding the new truck.");
  }
});

module.exports = router;

