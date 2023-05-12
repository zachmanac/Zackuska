const db = require('../connection');

// queryCheckExistingSchedule
const queryCheckExistingSchedule = async function(truck_id, date, start_time, end_time, address) {
  try {
    const result = await db.query(`SELECT * FROM schedules WHERE truck_id = $1 AND date = $2 AND start_time = $3 AND end_time = $4 AND address = $5`, [truck_id, date, start_time, end_time, address]);
    return result.rows.length > 0; // Return true if a schedule exists, false otherwise
  } catch (err) {
    console.log("Error", err);
    return false;
  }
};

// queryCheckSameTimeInAnotherPlace
const queryCheckSameTimeInAnotherPlace = async function(truck_id, date, start_time, end_time) {
  try {
    const result = await db.query(`SELECT * FROM schedules WHERE truck_id = $1 AND date = $2 AND ((start_time <= $3 AND end_time >= $3) OR (start_time <= $4 AND end_time >= $4))`, [truck_id, date, start_time, end_time]);
    return result.rows.length > 0; // Return true if the truck is scheduled at the same date and time in another place, false otherwise
  } catch (err) {
    console.log("Error", err);
    return false;
  }
};

module.exports = { queryCheckExistingSchedule, queryCheckSameTimeInAnotherPlace };
