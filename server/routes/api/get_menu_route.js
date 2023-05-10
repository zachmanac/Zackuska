const express = require('express');
const router = express.Router();
const queryGetMenu= require('../../database/queries/get_menu');

//fix the route to :truck_id it works like this
router.get('/api/trucks/:trucks_id/menu_items', (req, res) => {
  console.log("truck_id", req.params.trucks_id)
  queryGetMenu(req.params.trucks_id)

.then(menu_items=>{
  res.send(menu_items)
  
})// menu_items for a given truck 

     .catch(e => {
      console.error("Get Menu Error",e);
      res.send(e)
    });


});

module.exports = router;