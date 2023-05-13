const db = require('../../connection');

const listMenuItems = async function(label){
  const queryParam=[label];
  try {
    const result = await db.query(`SELECT * FROM menu_items WHERE item_label=$1`, queryParam);
    console.log(result.rows); //all menu_items from a given label
    return result.rows;
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = listMenuItems;
