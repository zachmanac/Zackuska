const db = require('../../connection');

const getOrderForUsers = async function(user_id){
  const queryParam=[user_id];
  try {
    const result = await db.query(`SELECT * FROM orders WHERE customer_id=$1`, queryParam);
    console.log(result.rows); //all orders from a given user
    return result.rows;
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = getOrderForUsers;
