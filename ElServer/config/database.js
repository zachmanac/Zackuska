const { Pool } = require('pg');

const pool = new Pool({
    user: 'your_database_username',
    host: 'localhost',
    database: 'your_database_name',
    password: 'your_database_password',
    port: 5432,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};