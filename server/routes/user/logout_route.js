const express = require('express');
const router = express.Router();

router.delete('/api/session', (req, res) => {
  console.log("req.session logout", req.session);
  delete req.session.userId;
  req.session.destroy();
  res.send("logged out");
});

module.exports = router;