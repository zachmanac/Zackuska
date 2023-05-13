const express = require('express');
const router = express.Router();
const queryGetReviewsForTruck= require('../../database/queries/review/get_reviews_for_trucks');


router.get('/api/trucks/:truck_id/reviews', (req, res) => {
  console.log("TRUCK_ID",req.params);

  queryGetReviewsForTruck(req.params.truck_id)

.then(orders=>{
  res.send(orders)
  
})

     .catch(e => {
      console.error("Get Reviews Error",e);
      res.send(e)
    });


});

module.exports = router;