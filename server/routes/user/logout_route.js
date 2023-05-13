const express = require('express');
const router = express.Router();

router.delete('/api/session', (req, res) => {
  req.session.userId = null;
  res.send("logged out");
});

module.exports = router;