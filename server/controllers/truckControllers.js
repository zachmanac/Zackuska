const { queryAddNewTruck, queryCheckExistingTruck } = require('../database/queries/truck');

// Function to add a new truck
const addNewTruck = async (req, res) => {
  try {
    const { owner_id, truck_name, phone_number, cuisine, instagram, facebook, picture, city } = req.body;

    // Check if a truck already exists for the owner
    const existingTruck = await queryCheckExistingTruck(owner_id);

    if (existingTruck) {
      return res.status(400).json({ error: 'A truck already exists for this owner' });
    }

    // Add the new truck to the database
    await queryAddNewTruck(owner_id, truck_name, phone_number, cuisine, instagram, facebook, picture, city);

    res.status(201).json({ message: 'New truck added successfully' });
  } catch (error) {
    console.error('Error adding new truck:', error);
    res.status(500).json({ error: 'Failed to add new truck' });
  }
};

module.exports = {
  addNewTruck,
};
