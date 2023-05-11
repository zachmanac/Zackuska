const express = require('express');
const router = express.Router();
const queryGetOrdersForUser= require('../../database/queries/get_order_for_users');


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