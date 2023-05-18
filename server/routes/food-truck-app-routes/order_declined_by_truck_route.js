const express = require('express');
const router = express.Router();
const {updateStatus}= require('../../database/queries/order/order_accepted_declined');
//trucks handle the post request for the orders and send response
router.post('/api/trucks/:order_id/declined', async (req, res) => {
  const { order_id } = req.params;
  const status='declined';
  try {
   //change the orders status in db declined and in the column response 
   const {response} = req.body;
   const result= await updateStatus(order_id, status, response)
   
    res.json(result);
  } catch (error) {
    console.error('Failed to process food-truck order:', error);
    res.status(500).json({ error: 'Failed to process food-truck order' });
  }
});



module.exports = router;


