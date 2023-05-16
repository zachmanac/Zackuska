const express = require('express');
const router = express.Router();
const queryGetReviewsForItem= require('../../database/queries/review/get_reviews_for_items');


router.get('/api/menu_items/:item_id/reviews', (req, res) => {
  console.log("Item_id",req.params);

  queryGetReviewsForItem(req.params.item_id)

.then(orders=>{
  res.send(orders)
  
})

     .catch(e => {
      console.error("Get Reviews Error",e);
      res.send(e)
    });


});

module.exports = router;