const { Pool } = require('pg');

const pool = new Pool();

const CREATE_MENU_ITEM_TABLE = `CREATE TABLE IF NOT EXISTS menu_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(6, 2) NOT NULL,
    image VARCHAR(255),
    active BOOLEAN DEFAULT true,
    hidden BOOLEAN DEFAULT false,
    daily_limit INT,
    truck_id INT REFERENCES food_trucks(id) ON DELETE CASCADE
);`;

const GET_MENU_ITEMS = 'SELECT * FROM menu_items ORDER BY id ASC;';
const GET_MENU_ITEM_BY_ID = 'SELECT * FROM menu_items WHERE id = $1;';
const INSERT_MENU_ITEM = 'INSERT INTO menu_items (name, description, price, image, active, hidden, daily_limit, truck_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;';
const UPDATE_MENU_ITEM = 'UPDATE menu_items SET name = $1, description = $2, price = $3, image = $4, active = $5, hidden = $6, daily_limit = $7 WHERE id = $8 RETURNING *;';
const DELETE_MENU_ITEM = 'DELETE FROM menu_items WHERE id = $1;';

module.exports = {
    CREATE_MENU_ITEM_TABLE,
    GET_MENU_ITEMS,
    GET_MENU_ITEM_BY_ID,
    INSERT_MENU_ITEM,
    UPDATE_MENU_ITEM,
    DELETE_MENU_ITEM,
};
