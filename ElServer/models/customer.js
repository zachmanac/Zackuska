const { Pool } = require('pg');

const pool = new Pool();

const CREATE_CUSTOMER_TABLE = `CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    location POINT
);`;

const GET_CUSTOMERS = 'SELECT * FROM customers ORDER BY id ASC;';
const GET_CUSTOMER_BY_ID = 'SELECT * FROM customers WHERE id = $1;';
const GET_CUSTOMER_BY_EMAIL = 'SELECT * FROM customers WHERE email = $1;';
const INSERT_CUSTOMER = 'INSERT INTO customers (name, email, password, location) VALUES ($1, $2, $3, $4) RETURNING *;';
const UPDATE_CUSTOMER = 'UPDATE customers SET name = $1, email = $2, password = $3, location = $4 WHERE id = $5 RETURNING *;';
const DELETE_CUSTOMER = 'DELETE FROM customers WHERE id = $1;';

module.exports = {
    CREATE_CUSTOMER_TABLE,
    GET_CUSTOMERS,
    GET_CUSTOMER_BY_ID,
    GET_CUSTOMER_BY_EMAIL,
    INSERT_CUSTOMER,
    UPDATE_CUSTOMER,
    DELETE_CUSTOMER,
};