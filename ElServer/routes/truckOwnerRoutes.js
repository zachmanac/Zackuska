const express = require('express');
const pool = require('../database');
const {
    GET_TRUCKOWNERS,
    GET_TRUCKOWNER_BY_ID,
    INSERT_TRUCKOWNER,
    UPDATE_TRUCKOWNER,
    DELETE_TRUCKOWNER,
} = require('../models/truckOwner');

const router = express.Router();

router.get('/', async (req, res) => {
    const { rows } = await pool.query(GET_TRUCKOWNERS);
    res.json(rows);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query(GET_TRUCKOWNER_BY_ID, [id]);
    if (rows.length === 0) {
        return res.status(404).json({ error: 'Truck owner not found' });
    }
    res.json(rows[0]);
});

router.post('/', async (req, res) => {
    const { name, email, password } = req.body; // Make sure to hash the password before storing it in production
    const { rows } = await pool.query(INSERT_TRUCKOWNER, [name, email, password]);
    res.status(201).json(rows[0]);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const { rows } = await pool.query(UPDATE_TRUCKOWNER, [name, email, password, id]);
    if (rows.length === 0) {
        return res.status(404).json({ error: 'Truck owner not found' });
    }
    res.json(rows[0]);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query(DELETE_TRUCKOWNER, [id]);
    res.json({ message: 'Truck owner deleted' });
});

module.exports = router;
