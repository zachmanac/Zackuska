const express = require('express');
const router = express.Router();
const query= require('../../database/queries/get_menu_items_given_food');


router.get('/api/:label/menu_items', (req, res) => {
  
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