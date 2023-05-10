const express = require('express');
const router = express.Router();

router.post('/api/session', (req, res) => {
  req.session.userId = null;
  res.send("logged out");
});

module.exports = router;