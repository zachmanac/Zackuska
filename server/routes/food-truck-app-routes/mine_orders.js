const express = require('express');
const router = express.Router();
const queryGetOrdersForTruck= require('../../database/queries/order/get_order_for_trucks');

//will get all the orders of a given truck
router.get('/api/trucks/:truck_id/orders', (req, res) => {
  console.log("TRUCK_ID",req.params);

  queryGetOrdersForTruck(req.params.truck_id)

.then(orders=>{
  res.send(orders)
  
})

     .catch(e => {
      console.error("Get Order Error",e);
      res.send(e)
    });


});

module.exports = router;