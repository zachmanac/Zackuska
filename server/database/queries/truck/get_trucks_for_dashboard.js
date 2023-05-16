const db = require('../../connection');


const queryTruckDashboard = async function(truck_id){
  
  try {
    const result = await db.query(`SELECT * FROM trucks WHERE trucks.truck_id=$1`, [truck_id]);
  

    return result.rows;
  } catch (err) {
    console.log("Error", err);
  }
};
  

module.exports = queryTruckDashboard;
