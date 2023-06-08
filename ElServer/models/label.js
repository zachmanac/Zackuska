const { Pool } = require('pg');

const pool = new Pool();

const CREATE_LABEL_TABLE = `CREATE TABLE IF NOT EXISTS labels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE
);`;

const GET_LABELS = 'SELECT * FROM labels ORDER BY id ASC;';
const GET_LABEL_BY_ID = 'SELECT * FROM labels WHERE id = $1;';
const INSERT_LABEL = 'INSERT INTO labels (name) VALUES ($1) RETURNING *;';
const UPDATE_LABEL = 'UPDATE labels SET name = $1 WHERE id = $2 RETURNING *;';
const DELETE_LABEL = 'DELETE FROM labels WHERE id = $1;';

module.exports = {
    CREATE_LABEL_TABLE,
    GET_LABELS,
    GET_LABEL_BY_ID,
    INSERT_LABEL,
    UPDATE_LABEL,
    DELETE_LABEL,
};
