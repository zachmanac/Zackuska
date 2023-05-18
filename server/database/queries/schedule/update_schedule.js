const db = require('../../connection');

const update_schedule = async function (shcedule_id, updated_schedule) {
  
  const queryParam = [updated_schedule.date,
    updated_schedule.address, 
    updated_schedule.latitude,
    updated_schedule.longitude,
    updated_schedule.start_time, 
    updated_schedule.end_time, 
    updated_schedule.place_name,
    shcedule_id];

  try {
   const result= await db.query(` UPDATE schedules
    SET 
      date = COALESCE($1, date),
      address = COALESCE($2, address),
      latitude = COALESCE($3, latitude),
      longitude = COALESCE($4, longitude),
      start_time = COALESCE($5, start_time),
      end_time = COALESCE($6, end_time),
      place_name = COALESCE($7, place_name)
    WHERE schedule_id = $8 RETURNING *;`, queryParam);

    console.log("Schedule updated", result.rows[0]);
    return result.rows[0];
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = update_schedule;
