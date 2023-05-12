const db = require('../connection');

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

const queryCheckExistingTruck = async function(owner_id, truck_name, phone_number) {
  try {
    const result = await db.query(`SELECT * FROM trucks WHERE owner_id = $1 AND truck_name = $2 AND phone_number = $3`, [owner_id, truck_name, phone_number]);
    return result.rows.length > 0; // Return true if a truck exists, false otherwise
  } catch (err) {
    console.log("Error", err);
    return false;
  }
};

module.exports ={queryAddNewTruck, queryCheckExistingTruck };
