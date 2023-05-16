const express = require('express');
const router = express.Router();
const {queryAddNewTruck, queryCheckExistingTruck } = require('../../database/queries/truck/add_new_truck');

//NEED TO VALIDATE THAT THE USER_TYPE IS OWNER
router.post('/api/trucks', async (req, res) => {
  try {
    //const truck_owner_id= req.session.userId;
    const truck_owner_id= 10;
    console.log("New truck params", req.body);
    const new_truck = req.body;
    //validate only one truck per truck_owner for now
    // Check if the truck already exists
    const truck = await queryCheckExistingTruck(truck_owner_id);

    if (truck) {
      // Truck already exists
      console.log("Truck already exists");
      res.status(409).send("Truck already exists.");
      return;
    }
//i need to validate the user_type is owner in login 

    // Proceed to add the new truck
    await queryAddNewTruck(
      truck_owner_id,
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

