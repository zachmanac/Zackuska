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

const updateStatus = async function (order_id, status, response) {
  const results= await db.query('UPDATE orders SET status = $2, response=$3 WHERE order_id = $1 RETURNING *', [order_id, status, response]);
  return results.rows;
};

const deleteOrder = function (order_id) {
  return db.query('DELETE FROM orders WHERE order_id = $1', [order_id]);
};


module.exports = {updateStatus, existingOrder, deleteOrder};