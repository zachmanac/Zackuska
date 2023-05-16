const express = require('express');
const router = express.Router();
const {updateStatus}= require('../../database/queries/order/order_accepted_declined');
//trucks handle the post request for the orders and send response
router.post('/api/trucks/:truck_id/:order_id/cancelled', async (req, res) => {
  const { truck_id, order_id } = req.params;
  const status='cancelled';
  try {
   //change the status in db accepted change the response in the column response in orders 
   const response = 'order cancelled';
   const result= await updateStatus(order_id, status, response)
   
    res.json(result);
  } catch (error) {
    console.error('Failed to process food-truck order:', error);
    res.status(500).json({ error: 'Failed to process food-truck order' });
  }
});



module.exports = router;


