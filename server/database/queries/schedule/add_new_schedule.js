const db = require('../../connection');

const add_new_schedule= async function (truck_id,
  date, address, latitude, longitude, start_time, end_time) {
  const queryParam = [truck_id,
    date, address, latitude, longitude, start_time, end_time];

  try {
    const result= await db.query(` INSERT INTO schedules (truck_id,
      date, address, latitude, longitude, start_time, end_time)
    VALUES
    ($1,$2,$3,$4,$5, $6, $7)`, queryParam);
    
   
    return result;
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = add_new_schedule;





