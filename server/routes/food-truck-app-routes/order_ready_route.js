const express = require('express');
const router = express.Router();
const {updateStatus}= require('../../database/queries/order/order_accepted_declined');

router.post('/api/trucks/:truck_id/:order_id/ready', async (req, res) => {
  const { truck_id, order_id } = req.params;
  const status='ready';
  try {
   //change the status in db ready add in the column response in orders 
   const response='ready to pick up'
   const result= await updateStatus(order_id, status, response)
   
    res.json(result);
  } catch (error) {
    console.error('Failed to process food-truck order:', error);
    res.status(500).json({ error: 'Failed to process food-truck order' });
  }
});



module.exports = router;


