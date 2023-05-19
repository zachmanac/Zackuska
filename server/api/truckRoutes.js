const express = require('express');
const { queryAddNewTruck, queryCheckExistingTruck } = require('../controllers/truckController');

const router = express.Router();

// Route: POST /api/trucks
// Add a new truck
router.post('/', async (req, res) => {
  try {
    const { owner_id, truck_name, phone_number, cuisine, instagram, facebook, picture, city } = req.body;

    // Check if the truck already exists for the owner
    const existingTruck = await queryCheckExistingTruck(owner_id);

    if (existingTruck) {
      return res.status(400).json({ error: 'Truck already exists for the owner' });
    }

    // Add the new truck
    await queryAddNewTruck(owner_id, truck_name, phone_number, cuisine, instagram, facebook, picture, city);

    res.status(200).json({ message: 'Truck added successfully' });
  } catch (error) {
    console.error('Error adding truck:', error);
    res.status(500).json({ error: 'Failed to add truck' });
  }
});

module.exports = router;
