const { Pool } = require('pg');

const pool = new Pool();

const CREATE_FOOD_TRUCK_TABLE = `CREATE TABLE IF NOT EXISTS foodTrucks (
    id SERIAL PRIMARY KEY,
    ownerId INT REFERENCES customers(id) ON DELETE CASCADE,
    name VARCHAR(100),
    description TEXT,
    location POINT
);`;

const GET_FOOD_TRUCKS = 'SELECT * FROM foodTrucks ORDER BY id ASC;';
const GET_FOOD_TRUCK_BY_ID = 'SELECT * FROM foodTrucks WHERE id = $1;';
const GET_FOOD_TRUCK_BY_OWNER_ID = 'SELECT * FROM foodTrucks WHERE ownerId = $1;';
const INSERT_FOOD_TRUCK = 'INSERT INTO foodTrucks (ownerId, name, description, location) VALUES ($1, $2, $3, $4) RETURNING *;';
const UPDATE_FOOD_TRUCK = 'UPDATE foodTrucks SET ownerId = $1, name = $2, description = $3, location = $4 WHERE id = $5 RETURNING *;';
const DELETE_FOOD_TRUCK = 'DELETE FROM foodTrucks WHERE id = $1;';

module.exports = {
    CREATE_FOOD_TRUCK_TABLE,
    GET_FOOD_TRUCKS,
    GET_FOOD_TRUCK_BY_ID,
    GET_FOOD_TRUCK_BY_OWNER_ID,
    INSERT_FOOD_TRUCK,
    UPDATE_FOOD_TRUCK,
    DELETE_FOOD_TRUCK,
};
