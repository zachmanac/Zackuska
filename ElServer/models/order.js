const { Pool } = require('pg');

const pool = new Pool();

const CREATE_ORDER_TABLE = `CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    customerId INT REFERENCES customers(id) ON DELETE SET NULL,
    truckId INT REFERENCES foodTrucks(id) ON DELETE CASCADE,
    total DECIMAL(5,2),
    status VARCHAR(50) DEFAULT 'pending',
    paid BOOLEAN DEFAULT false,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const CREATE_ORDER_ITEM_TABLE = `CREATE TABLE IF NOT EXISTS orderItems (
    id SERIAL PRIMARY KEY,
    orderId INT REFERENCES orders(id) ON DELETE CASCADE,
    menuItemId INT REFERENCES menuItems(id) ON DELETE SET NULL,
    quantity INT
);`;

const GET_ORDERS = 'SELECT * FROM orders ORDER BY id ASC;';
const GET_ORDER_BY_ID = 'SELECT * FROM orders WHERE id = $1;';
const GET_ORDERS_BY_CUSTOMER_ID = 'SELECT * FROM orders WHERE customerId = $1;';
const GET_ORDERS_BY_TRUCK_ID = 'SELECT * FROM orders WHERE truckId = $1;';
const INSERT_ORDER = 'INSERT INTO orders (customerId, truckId, total, status, paid) VALUES ($1, $2, $3, $4, $5) RETURNING *;';
const UPDATE_ORDER = 'UPDATE orders SET customerId = $1, truckId = $2, total = $3, status = $4, paid = $5 WHERE id = $6 RETURNING *;';
const DELETE_ORDER = 'DELETE FROM orders WHERE id = $1;';

const GET_ORDER_ITEMS = 'SELECT * FROM orderItems WHERE orderId = $1;';
const INSERT_ORDER_ITEM = 'INSERT INTO orderItems (orderId, menuItemId, quantity) VALUES ($1, $2, $3) RETURNING *;';
const DELETE_ORDER_ITEM = 'DELETE FROM orderItems WHERE id = $1;';

module.exports = {
    CREATE_ORDER_TABLE,
    CREATE_ORDER_ITEM_TABLE,
    GET_ORDERS,
    GET_ORDER_BY_ID,
    GET_ORDERS_BY_CUSTOMER_ID,
    GET_ORDERS_BY_TRUCK_ID,
    INSERT_ORDER,
    UPDATE_ORDER,
    DELETE_ORDER,
    GET_ORDER_ITEMS,
    INSERT_ORDER_ITEM,
    DELETE_ORDER_ITEM,
};
