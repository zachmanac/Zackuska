const db = require('../../connection');

const queryAddNewTruck = async function (owner_id, truck_name, phone_number, cuisine, instagram, facebook, picture, city) {
  const queryParam = [owner_id, truck_name, phone_number, cuisine, instagram, facebook, picture, city];

  try {
    await db.query(` INSERT INTO trucks(owner_id, truck_name, phone_number, cuisine,instagram, facebook, picture, city)
  VALUES
    ($1,$2,$3,$4,$5, $6, $7, $8)`, queryParam);


  } catch (err) {
    console.log("Error", err);
  }
};

const queryCheckExistingTruck = async function(owner_id) {
  try {
    const result = await db.query(`SELECT * FROM trucks WHERE owner_id = $1`, [owner_id]);
    console.log("RESULT", result.rows[0]);
    return result.rows[0]; // Return truck
  } catch (err) {
    console.log("Error", err);
    return false;
  }
};

module.exports ={queryAddNewTruck, queryCheckExistingTruck };
