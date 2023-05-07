const express = require('express');
const router = express.Router();
const listMenuItems= require('../database/queries/get_menu');


router.get('/api/:truck_id/menu', (req, res) => {
  console.log("truck_id", req.params.truck_id)
  listMenuItems(req.params.truck_id)

.then(menu_items=>{
  
  console.log('Menu', menu_items)})// menu_items for a given truck 

     .catch(e => {
      console.error("Get Menu Error",e);
      res.send(e)
    });


});

module.exports = router;