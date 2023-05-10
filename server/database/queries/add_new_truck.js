const db = require('../connection');

const add_new_truck = async function (owner_id, truck_name, phone_number, cuisine, instagram, facebook, picture, city) {
  const queryParam = [owner_id, truck_name, phone_number, cuisine, instagram, facebook, picture, city];

  try {
    await db.query(` INSERT INTO trucks(owner_id, truck_name, phone_number, cuisine,instagram, facebook, picture, city)
  VALUES
    ($1,$2,$3,$4,$5, $6, $7, $8)`, queryParam);
    console.log("Truck added");

  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = add_new_truck;
