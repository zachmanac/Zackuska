const db = require('../../connection');

const add_new_menu_item = async function (truck_id,
  item_name, price, calories, allergens, halal, picture, description, item_label, quantity) {
    
  const queryParam = [truck_id,
    item_name, price, calories, allergens, halal, picture, description, item_label, quantity];

  try {
    await db.query(` INSERT INTO menu_items (truck_id,item_name,price,calories,allergens,halal, picture, description, item_label, quantity)
    VALUES
    ($1,$2,$3,$4,$5, $6, $7, $8, $9, $10)`, queryParam);
    console.log("Menu item added");
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = add_new_menu_item;
