
const express = require('express');
const router = express.Router();
const {updateStatus}= require('../../database/queries/order/order_accepted_declined');
//trucks handle the post request for the orders and send response
router.post('/api/trucks/:order_id/completed', async (req, res) => {
  const { order_id } = req.params;
  const status='completed';
  try {
   //change the orders status in db completed and in the column response 
   const {response} = 'order picked up';
   const result= await updateStatus(order_id, status, response)
   
    res.json(result);
  } catch (error) {
    console.error('Failed to process order completed:', error);
    res.status(500).json({ error: 'Failed to process order completed' });
  }
});



module.exports = router;


