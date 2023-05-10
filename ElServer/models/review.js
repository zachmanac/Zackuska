const { Pool } = require('pg');

const pool = new Pool();

const CREATE_REVIEW_TABLE = `CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    customerId INT REFERENCES customers(id) ON DELETE SET NULL,
    truckId INT REFERENCES foodTrucks(id) ON DELETE CASCADE,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const GET_REVIEWS = 'SELECT * FROM reviews ORDER BY id ASC;';
const GET_REVIEW_BY_ID = 'SELECT * FROM reviews WHERE id = $1;';
const GET_REVIEWS_BY_CUSTOMER_ID = 'SELECT * FROM reviews WHERE customerId = $1;';
const GET_REVIEWS_BY_TRUCK_ID = 'SELECT * FROM reviews WHERE truckId = $1;';
const INSERT_REVIEW = 'INSERT INTO reviews (customerId, truckId, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *;';
const UPDATE_REVIEW = 'UPDATE reviews SET customerId = $1, truckId = $2, rating = $3, comment = $4 WHERE id = $5 RETURNING *;';
const DELETE_REVIEW = 'DELETE FROM reviews WHERE id = $1;';

module.exports = {
    CREATE_REVIEW_TABLE,
    GET_REVIEWS,
    GET_REVIEW_BY_ID,
    GET_REVIEWS_BY_CUSTOMER_ID,
    GET_REVIEWS_BY_TRUCK_ID,
    INSERT_REVIEW,
    UPDATE_REVIEW,
    DELETE_REVIEW,
};
