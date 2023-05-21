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
  console.log("results.rows after updating status i think", results.rows);
  return results.rows;
};

const deleteOrder = function (order_id) {
  return db.query('DELETE FROM orders WHERE order_id = $1', [order_id]);
};
  

  const updateInventory = async function (order_id) {
    const order_details = await db.query('SELECT item_id, quantity FROM order_details WHERE order_id=$1', [order_id]);
    const items = order_details.rows;
  
    for (const item of items) {
      const { item_id, quantity } = item;
      await db.query('UPDATE menu_items SET quantity = quantity - $1 WHERE item_id = $2', [quantity, item_id]);
  
      if (quantity <= 0) {
        await db.query('UPDATE menu_items SET active = FALSE WHERE item_id = $1', [item_id]);
      }
    }
  }
  

module.exports = {updateStatus, existingOrder, deleteOrder,updateInventory};