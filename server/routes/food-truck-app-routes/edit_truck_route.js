const express = require('express');
const router = express.Router();
const queryUpdateTruckInfo= require('../../database/queries/truck/update_truck_info');

router.put('/api/trucks/:truck_id', async (req, res) => {
  const updated_truck=req.body;
  const truck_id = req.params.truck_id;

  try {
    const result= await queryUpdateTruckInfo(truck_id,updated_truck);
    res.json(result);
  } catch (error) {
    console.error('Failed to update truck:', error);
    res.status(500).json({ error: 'Failed to update truck' });
  }
});

module.exports = router;
