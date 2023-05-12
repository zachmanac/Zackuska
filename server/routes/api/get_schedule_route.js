const express = require('express');
const router = express.Router();
const queryGetSchedule= require('../../database/queries/get_schedule');


router.get('/api/trucks/:trucks_id/schedules', (req, res) => {
  console.log("truck_id", req.params.trucks_id)
  queryGetSchedule(req.params.trucks_id)

.then(menu_items=>{
  res.send(menu_items)
  
})// schedule for a given truck 

     .catch(e => {
      console.error("Get Schedule Error",e);
      res.send(e)
    });


});

module.exports = router;



