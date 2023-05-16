const express = require('express');
const router = express.Router();
const getPendingOrderForTrucks = require('../../database/queries/order/get_pending_orders_for_trucks');

router.get('/api/trucks/:truck_id/pending_orders', async (req, res) => {
  try {
    //console.log("TRUCK_ID", req.params);
    const orders = await getPendingOrderForTrucks(req.params.truck_id);
    res.send(orders);
  } catch (e) {
    console.error("Get Pending Orders Error", e);
    res.send(e);
  }
});

module.exports = router;
