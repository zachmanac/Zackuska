const express = require('express');
const router = express.Router();
const query = require('../../database/queries/add_new_order');

//need to validate if it is accepted by the truck first
router.post('/api/cart/checkout', (req, res) => {
  console.log("new order params", req.body)
  const new_order = req.body;

  query(new_order.customer_id, new_order.truck_id, new_order.status, new_order.total_amount, new_order.total_calories, new_order.date, new_order.details)
/*details = [
  { item_id: 1, quantity: 3 },
  { item_id: 2, quantity: 1 },
  // Add more items as needed
];*/

    .then(() => {
      
      res.send("Order added sucessfully");

    })
    .catch(e => {
      console.error("Fail to add new truck to database", e);
      res.send(e)
    });


});

module.exports = router;