const db = require('../../connection');

const listMenuItems = async function(truck_id){
  const queryParam=[truck_id];
  try {
    const result = await db.query(`SELECT * FROM menu_items WHERE truck_id=$1 ORDER BY item_name ASC`, queryParam);
    console.log(result.rows); //all menu_items from a given truck
    return result.rows;
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = listMenuItems;
