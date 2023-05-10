const Label = require('../models/label');
const { body } = require('express-validator');
const { validationResult } = require('express-validator');
const logger = require('morgan');

// Middleware for validating label's input
const validateLabelInput = [
  body('name').notEmpty().withMessage('Label name is required.'),
  // Additional input validation logic here (e.g. check name characters, length, etc.)
];

exports.createLabel = [
  validateLabelInput,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const label = new Label(req.body);
      await label.save();
      res.status(201).json(label);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

exports.getAllLabels = async (req, res) => {
  try {
    const labels = await Label.find();
    res.json(labels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLabelById = async (req, res) => {
  try {
    const { id } = req.params;
    const label = await Label.findById(id);
    if (!label) {
      return res.status(404).json({ error: 'Label not found.' });
    }
    res.json(label);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLabel = [
  validateLabelInput,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const updatedLabel = await Label.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedLabel) {
        return res.status(404).json({ error: 'Label not found.' });
      }
      res.json(updatedLabel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

exports.deleteLabel = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLabel = await Label.findByIdAndDelete(id);
    if (!deletedLabel) {
      return res.status(404).json({ error: 'Label not found.' });
    }
    res.status(204).json({ message: 'Label deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
