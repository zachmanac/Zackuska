const db = require('../../connection');

const getOrderForTrucks = async function(truck_id){
  const queryParam=[truck_id];
  try {
    const result = await db.query(`SELECT * FROM orders WHERE truck_id=$1 ORDER BY date DESC`, queryParam);
    console.log(result.rows); //all orders from a given truck
    return result.rows;
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = getOrderForTrucks;
