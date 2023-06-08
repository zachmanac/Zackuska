const { Pool } = require('pg');

const pool = new Pool();

const CREATE_PROMOTION_TABLE = `CREATE TABLE IF NOT EXISTS promotions (
    id SERIAL PRIMARY KEY,
    truckId INT REFERENCES foodTrucks(id) ON DELETE CASCADE,
    title VARCHAR(100),
    description TEXT,
    startsAt TIMESTAMP,
    endsAt TIMESTAMP
);`;

const GET_PROMOTIONS = 'SELECT * FROM promotions ORDER BY id ASC;';
const GET_PROMOTION_BY_ID = 'SELECT * FROM promotions WHERE id = $1;';
const GET_PROMOTIONS_BY_TRUCK_ID = 'SELECT * FROM promotions WHERE truckId = $1;';
const INSERT_PROMOTION = 'INSERT INTO promotions (truckId, title, description, startsAt, endsAt) VALUES ($1, $2, $3, $4, $5) RETURNING *;';
const UPDATE_PROMOTION = 'UPDATE promotions SET truckId = $1, title = $2, description = $3, startsAt = $4, endsAt = $5 WHERE id = $6 RETURNING *;';
const DELETE_PROMOTION = 'DELETE FROM promotions WHERE id = $1;';

module.exports = {
    CREATE_PROMOTION_TABLE,
    GET_PROMOTIONS,
    GET_PROMOTION_BY_ID,
    GET_PROMOTIONS_BY_TRUCK_ID,
    INSERT_PROMOTION,
    UPDATE_PROMOTION,
    DELETE_PROMOTION,
};
