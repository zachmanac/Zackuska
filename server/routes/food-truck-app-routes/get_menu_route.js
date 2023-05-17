const express = require('express');
const router = express.Router();
const listMenuItems= require('../../database/queries/menu/get_menu');


router.get('/api/trucks/:truck_id/menu_items', (req, res) => {
  console.log("truck_id in getmenuitems", req.params.truck_id)
  listMenuItems(req.params.truck_id)

.then(menu_items=>{
  res.send(menu_items)
  
})// menu_items for a given truck 

     .catch(e => {
      console.error("Get Menu Error",e);
      res.send(e)
    });


});

module.exports = router;