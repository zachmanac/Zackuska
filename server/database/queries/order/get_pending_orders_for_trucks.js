const db = require('../../connection');

const getPendingOrderForTrucks = async function(truck_id){
  const queryParam=[truck_id];
  try {
    const result = await db.query(`SELECT * FROM orders WHERE truck_id = $1 AND status = 'pending';
    `, queryParam);
    console.log(result.rows); //all pending orders from a given truck
    return result.rows;
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = getPendingOrderForTrucks;
