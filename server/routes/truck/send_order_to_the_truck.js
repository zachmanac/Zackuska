const express = require('express');
const router = express.Router();

//trucks handle the post request for the orders and send response
router.post('/api/trucks/orders', async (req, res) => {
  try {
   console.log('Received request from server', req.body)

    res.send('Response from client');
  } catch (error) {
    console.error('Failed to process food-truck order:', error);
    res.status(500).json({ error: 'Failed to process food-truck order' });
  }
});

module.exports = router;


