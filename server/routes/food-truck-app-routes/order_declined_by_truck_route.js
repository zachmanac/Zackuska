const express = require('express');
const router = express.Router();
const {updateStatus}= require('../../database/queries/order/order_accepted_declined');
//trucks handle the post request for the orders and send response
router.post('/api/trucks/:truck_id/:order_id/accepted', async (req, res) => {
  const { truck_id, order_id } = req.params;
  const status='declined';
  try {
   //change the orders status in db declined and in the column response 
   const {explanation} = req.body;
   const result= await updateStatus(order_id, status, explanation)
   
    res.json(result);
  } catch (error) {
    console.error('Failed to process food-truck order:', error);
    res.status(500).json({ error: 'Failed to process food-truck order' });
  }
});



module.exports = router;


