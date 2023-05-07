const db = require('../connection');

const listMenuItems = function(truck_id){
  const queryParam=[truck_id];
  return db.query(`SELECT * FROM menu_items WHERE truck_id=$1`, queryParam)
  
  .then((result) => {
    console.log(result.rows);//all menu_items from a given truck
    return result.rows;

  })
  .catch((err) => {
    console.log("Error", err);
  });
};

module.exports = listMenuItems;
