const express = require('express');
const router = express.Router();
const queryGetOrdersForUser= require('../../database/queries/order/get_order_for_users');
//gets all the orders for a given user in the query

router.get('/api/orders', (req, res) => {
  console.log("USER_ID",req.query);
  queryGetOrdersForUser(req.query.user_id)

.then(orders=>{
  res.send(orders)
  
})

     .catch(e => {
      console.error("Get Order Error",e);
      res.send(e)
    });


});

module.exports = router;