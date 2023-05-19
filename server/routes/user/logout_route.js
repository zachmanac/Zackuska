const express = require('express');
const router = express.Router();

router.delete('/api/session', (req, res) => {
  console.log("req.session logout", req.session);
  req.session.userId = null;
  res.send("logged out");
});

module.exports = router;
