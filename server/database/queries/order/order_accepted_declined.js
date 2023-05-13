const db = require('../../connection');

const existingOrder = async function (order_id) {
  try {
    const result = await db.query('SELECT * FROM orders WHERE order_id = $1', [order_id]);
    return result.rows;
  } catch (err) {
    console.log("Error", err);
    return [];
  }
};

const updateStatus = function (order_id, status) {
  return db.query('UPDATE orders SET status = $2 WHERE order_id = $1', [order_id, status]);
};

const deleteOrder = function (order_id) {
  return db.query('DELETE FROM orders WHERE order_id = $1', [order_id]);
};


module.exports = {updateStatus, existingOrder, deleteOrder};