const db = require('../../connection');

const update_truck_info = async function (truck_id, updated_truck) {
  
  const queryParam = [updated_truck.truck_name, updated_truck.phone_number, updated_truck.cuisine, updated_truck.instagram, updated_truck.facebook, updated_truck.website,updated_truck.picture ,updated_truck.city, truck_id];

  try {
   const result= await db.query(`
   UPDATE trucks
   SET 
   truck_name = COALESCE($1, truck_name),
   phone_number = COALESCE($2, phone_number),
   cuisine = COALESCE($3, cuisine),
   instagram = COALESCE($4, instagram),
   facebook = COALESCE($5, facebook),
   website = COALESCE($6, website),
   picture = COALESCE($7, picture),
   city = COALESCE($8, city)
   WHERE truck_id= $9
   RETURNING *;
 `, queryParam);
 

    console.log("Truck updated", result.rows[0]);
    return result.rows[0];
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = update_truck_info;
