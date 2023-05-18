const express = require('express');
const router = express.Router();
const query= require('../../database/queries/menu/get_menu_items_given_label');

//get the menu items with a specific labelpsql

router.get('/api/menu_items/:label', (req, res) => {
  
  query(req.params.label)

.then(menu_items=>{
  console.log("Menu Items", menu_items)
  res.send(menu_items)
 
})// menu_items for a given label 

     .catch(e => {
      console.error("Get Menu Error",e);
      res.send(e)
    });


});

module.exports = router;