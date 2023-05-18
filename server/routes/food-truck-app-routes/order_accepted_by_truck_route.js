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

    // Set a delay of 10 seconds to check for response, otherwise update to 'accepted'
    const timeout = setTimeout(async () => {
      if (!result) {
        await updateStatus(order_id, status, 'accepted');
      }
    }, 10000); // 10 seconds

    // Assuming `updateStatus` returns a promise, you can add a timeout to wait for the result
    const timeoutPromise = new Promise((resolve) => {
      setTimeout(() => resolve(null), 10000); // Resolve with null after 10 seconds if no response
    });

    // Wait for either the result or the timeout
    const finalResult = await Promise.race([result, timeoutPromise]);

    // Clear the timeout to prevent it from executing if a response is received
    clearTimeout(timeout);

    res.json(finalResult);
  } catch (error) {
    console.error('Failed to process food-truck order:', error);
    res.status(500).json({ error: 'Failed to process food-truck order' });
  }
});

module.exports = router;
