const express = require('express');
const router = express.Router();
const queryUpdateSchedule= require('../../database/queries/schedule/update_schedule');

router.put('/api/trucks/schedules/:schedule_id', async (req, res) => {
  const updated_schedule=req.body;
  const schedule_id = req.params.schedule_id;

  try {
    const result= await queryUpdateSchedule(schedule_id,updated_schedule);
    res.json(result);
  } catch (error) {
    console.error('Failed to update schedule:', error);
    res.status(500).json({ error: 'Failed to update schedule' });
  }
});

module.exports = router;
