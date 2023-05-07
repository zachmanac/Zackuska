const db = require('../connection');
//needs validation

const add_new_truck = function (owner_id, truck_name, phone_number, cuisine, instagram, facebook, picture) {
  const queryParam = [owner_id, truck_name, phone_number, cuisine, instagram, facebook, picture];

  return db.query(` INSERT INTO trucks(owner_id, truck_name, phone_number, cuisine,instagram, facebook, picture)
  VALUES
    ($1,$2,$3,$4,$5, $6, $7)`, queryParam)

    .then(() => {
      console.log("Truck added")

    })
    .catch((err) => {
      console.log("Error", err);
    });
};

module.exports = add_new_truck;
