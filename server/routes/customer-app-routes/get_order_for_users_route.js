const express = require('express');
const router = express.Router();
const queryGetOrdersForUser = require('../../database/queries/order/get_order_for_users');


router.get('/api/orders', async (req, res) => {
  try {
    const userId = req.session.userId;
    console.log("reqsessionuserid", req.session.userId);

    const orders = await queryGetOrdersForUser(userId);
    res.send(orders);
  } catch (e) {
    console.error("Get Order Error", e);
    res.send(e);
  }
});

module.exports = router;
