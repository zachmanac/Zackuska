const express = require('express');
const router = express.Router();
const getOrderbyId= require('../../database/queries/order/get_order_by_id');
//gets the status of the order by customer
//maybe after ther order is sent customer-app could refresh order until gets the response
router.get('/api/orders/:order_id/status', async (req, res) => {

  const order_id=req.params.order_id;
  try {
   //give the order details to user, query: select *from orders where order_id=order_id;
  const order= await getOrderbyId(order_id);
  res.send(order);
  } catch (error) {
    console.error('Failed to get order:', error);
    res.status(500).json({ error: 'Failed to get order' });
  }
});



module.exports = router;



