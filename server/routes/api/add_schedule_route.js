const express = require('express');
const router = express.Router();
const queryAddNewSchedule = require('../../database/queries/add_new_schedule');
const {queryCheckExistingSchedule, queryCheckSameTimeInAnotherPlace} = require('../../database/queries/check_schedule');


router.post('/api/trucks/:truck_id/schedules', async (req, res) => {
  const truck_id= req.params.truck_id;
  try {
    console.log("New itinerary", req.body);
    
    const new_schedule = req.body;
        // Check if the schedule already exists
        const scheduleExists = await queryCheckExistingSchedule(
          truck_id,
          new_schedule.date,
          new_schedule.start_time,
          new_schedule.end_time,
          new_schedule.address
        );
    
        if (scheduleExists) {
          // Schedule already exists
          console.log("Schedule already exists");
          res.status(409).send("Schedule already exists.");
          return;
        }

    // Check if the truck is already scheduled at the same date and time in another place
    const existingSchedule = await queryCheckSameTimeInAnotherPlace(
      truck_id,
      new_schedule.date,
      new_schedule.start_time,
      new_schedule.end_time
    );

    if (existingSchedule) {
      // Truck is already scheduled at the same date and time in another place
      console.log("Truck is already scheduled at the same date and time in another place");
      res.status(409).send("Truck is already scheduled at the same date and time in another place.");
      return;
    }



    // Proceed to add the new schedule
    const addedSchedule = await queryAddNewSchedule(
      truck_id,
      new_schedule.date,
      new_schedule.address,
      new_schedule.latitude,
      new_schedule.longitude,
      new_schedule.start_time,
      new_schedule.end_time
    );

    if (addedSchedule) {
      console.log("Schedule added successfully");
      res.status(200).send("Schedule Itinerary Added");
    } else {
      console.log("Failed to add new schedule");
      res.status(500).send("Failed to add new schedule.");
    }
  } catch (error) {
    console.error("Failed to add new schedule", error);
    res.status(500).send("An error occurred while adding the new schedule.");
  }
});

module.exports = router;



