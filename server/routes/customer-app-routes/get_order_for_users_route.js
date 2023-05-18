const express = require('express');
const router = express.Router();
const queryGetOrdersForUser = require('../../database/queries/order/get_order_for_users');

//this userId is passed in the query like this: http://localhost:8080/api/orders?user_id=1

router.get('/api/orders', async (req, res) => {
  try {
    //console.log("USER_ID", req.query);
    const orders = await queryGetOrdersForUser(req.query.user_id);
    res.send(orders);
  } catch (e) {
    console.error("Get Order Error", e);
    res.send(e);
  }
});

module.exports = router;
