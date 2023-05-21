const express = require('express');
const router = express.Router();
const { updateStatus, updateInventory } = require('../../database/queries/order/order_accepted_declined');

// Handle the POST request for accepting an order by a food truck
router.post('/api/trucks/:order_id/accepted', async (req, res) => {
  const { order_id } = req.params;
  const status = 'Accepted';
  
  try {
    const response = 'Your order has been accepted.';
    console.log("response", response)

    // Update the status and response in the orders table
    const result = await updateStatus(order_id, status, response);
    console.log('result after accepted', result);
    updateInventory(order_id);

   
   // const details= updateInventory()

    res.json(result);
  } catch (error) {
    console.error('Failed to accept order:', error);
    res.status(500).json({ error: 'Failed to accept order' });
  }
});

module.exports = router;



