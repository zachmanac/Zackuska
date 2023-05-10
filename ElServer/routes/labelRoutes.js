const express = require('express');
const { body } = require('express-validator');
const labelController = require('../controllers/labelController');

const router = express.Router();

// Routes for labels
router.post('/labels', [
  body('name').notEmpty().isString(),
], labelController.createLabel);

router.get('/labels', labelController.getAllLabels);

router.get('/labels/:id', labelController.getLabelById);

router.put('/labels/:id', [
  body('name').notEmpty().isString(),
], labelController.updateLabel);

router.delete('/labels/:id', labelController.deleteLabel);

module.exports = router;
