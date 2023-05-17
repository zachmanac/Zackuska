const express = require('express');
const router = express.Router();

router.delete('/api/session', (req, res) => {
  console.log("req.session logout", req.session);
  req.session.userid = null;
  res.send("logged out");
});

module.exports = router;