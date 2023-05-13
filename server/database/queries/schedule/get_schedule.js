const db = require('../../connection');

const listItineraries = async function(truck_id){
  const queryParam=[truck_id];
  try {
    const result = await db.query(`SELECT * FROM schedules WHERE truck_id=$1`, queryParam);
    console.log(result.rows); //all itinararies from a given truck
    return result.rows;
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = listItineraries;
