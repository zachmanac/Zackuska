const { Pool } = require('pg');

const pool = new Pool();

const CREATE_TRUCKOWNER_TABLE = `CREATE TABLE IF NOT EXISTS truck_owners (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    location POINT
);`;

const GET_TRUCKOWNERS = 'SELECT * FROM truck_owners ORDER BY id ASC;';
const GET_TRUCKOWNER_BY_ID = 'SELECT * FROM truck_owners WHERE id = $1;';
const GET_TRUCKOWNER_BY_EMAIL = 'SELECT * FROM truck_owners WHERE email = $1;';
const INSERT_TRUCKOWNER = 'INSERT INTO truck_owners (name, email, password, location) VALUES ($1, $2, $3, $4) RETURNING *;';
const UPDATE_TRUCKOWNER = 'UPDATE truck_owners SET name = $1, email = $2, password = $3, location = $4 WHERE id = $5 RETURNING *;';
const DELETE_TRUCKOWNER = 'DELETE FROM truck_owners WHERE id = $1;';

module.exports = {
    CREATE_TRUCKOWNER_TABLE,
    GET_TRUCKOWNERS,
    GET_TRUCKOWNER_BY_ID,
    GET_TRUCKOWNER_BY_EMAIL,
    INSERT_TRUCKOWNER,
    UPDATE_TRUCKOWNER,
    DELETE_TRUCKOWNER,
};
