const db = require('../../connection');

const getOrderById = async function(order_id){
 
  try {
    const result = await db.query(`SELECT * FROM orders WHERE order_id=$1`, [order_id]);
    console.log(result.rows); //all orders from a given truck
    return result.rows;
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = getOrderById;
