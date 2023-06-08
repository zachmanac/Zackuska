const { Pool } = require('pg');

const pool = new Pool();

const CREATE_ADMIN_TABLE = `CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);`;

const GET_ADMINS = 'SELECT * FROM admins ORDER BY id ASC;';
const GET_ADMIN_BY_ID = 'SELECT * FROM admins WHERE id = $1;';
const GET_ADMIN_BY_EMAIL = 'SELECT * FROM admins WHERE email = $1;';
const INSERT_ADMIN = 'INSERT INTO admins (name, email, password) VALUES ($1, $2, $3) RETURNING *;';
const UPDATE_ADMIN = 'UPDATE admins SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *;';
const DELETE_ADMIN = 'DELETE FROM admins WHERE id = $1;';

module.exports = {
    CREATE_ADMIN_TABLE,
    GET_ADMINS,
    GET_ADMIN_BY_ID,
    GET_ADMIN_BY_EMAIL,
    INSERT_ADMIN,
    UPDATE_ADMIN,
    DELETE_ADMIN,
};
