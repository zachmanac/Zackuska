const express = require('express');
const router = express.Router();
const { updateStatus } = require('../../database/queries/order/order_accepted_declined');

// Handle the POST request for accepting an order by a food truck
router.post('/api/trucks/:order_id/accepted', async (req, res) => {
  const { order_id } = req.params;
  const status = 'accepted';

  try {
    const { response } = req.body;

    // Update the status and response in the orders table
    const result = await updateStatus(order_id, status, response);

    res.json(result);
  } catch (error) {
    console.error('Failed to accept order:', error);
    res.status(500).json({ error: 'Failed to accept order' });
  }
});

module.exports = router;
