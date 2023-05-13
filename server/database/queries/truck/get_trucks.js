const db = require('../../connection');

function queryTrucks(filter, page) {
  const { city, latitude, longitude, cuisine } = filter;
  const limit = 10; // Number of records per page
  const offset = (page - 1) * limit; // Calculate the offset based on the page number

  let query = `SELECT trucks.*, schedules.date, schedules.address, schedules.start_time, schedules.end_time, schedules.place_name
               FROM trucks
               JOIN schedules ON trucks.truck_id = schedules.truck_id
               WHERE 1=1`;
  let params = [];

  if (city) {
    query += ` AND trucks.city = $${params.length + 1}`;
    params.push(city);
  }
  
  if (cuisine) {
    query += ` AND trucks.cuisine = $${params.length + 1}`;
    params.push(cuisine);
  }

  if (latitude && longitude) {
    const distance = 10; // Distance in kilometers i made it constant for now but should be given by the user
    query += ` AND ST_DWithin(
                  ST_MakePoint(schedules.longitude, schedules.latitude)::geography,
                  ST_MakePoint($${params.length + 1}, $${params.length + 2})::geography,
                  $${params.length + 3} * 1000
                )`;
    params.push(longitude, latitude, distance);
  }

  /*query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
  params.push(limit, offset);*/

  return db.query(query, params)
    .then(result => result.rows)
    .catch(error => {
      console.error('Failed to fetch trucks from the database', error);
      throw error;
    });
}

module.exports = queryTrucks;
