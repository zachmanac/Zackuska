const express = require('express');
const router = express.Router();
const queryGetOrdersForUser = require('../../database/queries/order/get_order_for_users');

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
