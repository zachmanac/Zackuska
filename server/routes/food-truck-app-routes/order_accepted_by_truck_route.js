const express = require('express');
const router = express.Router();
const { addNewOrder, updateStatus } = require('../../database/queries/order/order_accepted_declined');
//trucks handle the post request for the orders and send response
router.post('/api/trucks/:truck_id/:order_id/accepted', async (req, res) => {
  const { truck_id, order_id } = req.params;
  const status = 'accepted';
  try {
    //change the status in db accepted add in the column response in orders 
    const { ready_time } = req.body;
    const result = await updateStatus(order_id, status, ready_time)

    // Set a delay of 10 seconds to automatically accept the order
    setTimeout(async () => {
      await updateStatus(order_id, 'accepted');
    }, 10000); // 10 seconds

    res.json(result);
  } catch (error) {
    console.error('Failed to process food-truck order:', error);
    res.status(500).json({ error: 'Failed to process food-truck order' });
  }
});

module.exports = router;
