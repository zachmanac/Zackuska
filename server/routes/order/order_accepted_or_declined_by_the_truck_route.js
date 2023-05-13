const express = require('express');
const router = express.Router();
const { updateStatus, existingOrder} = require('../../database/queries/order/order_accepted_declined');
const axios = require('axios');

// Route to submit an order
router.post('/api/orders/:order_id/submit', async (req, res) => {
  const order_id = req.params.order_id;

  try {
    // Check if the order exists
    const order = await existingOrder(order_id);
    if (order.length === 0) {
      return res.status(404).send('Order not found.');
    }

    const truckResponse = await axios.post(`http://localhost:3000/food-truck-app/${order_id}`);
    const status = truckResponse.status;
    const estimatedReadyTime = truckResponse.data.time;

    // Process the response from the truck
    if (status === 'accepted') {
      // Truck accepted the order
      console.log('Order accepted by the truck');
      await updateStatus(order_id, status);

      res.json({
        message: 'Order Accepted',
        estimatedReadyTime: estimatedReadyTime,
        order: order[0]
      });
    } else {
      // Truck declined the order
      const explanation = truckResponse.data.explanation;
      console.log('Order declined by the truck');
      res.status(200).json({
        order: order[0],
        message: 'Order declined',
        explanation: explanation
      });
      await updateStatus(order_id, status);
    }
  } catch (error) {
    console.error('Failed to submit the order', error);
    res.status(500).send('An error occurred while submitting the order.');
  }
});

module.exports = router;
