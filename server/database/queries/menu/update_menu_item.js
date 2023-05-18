const db = require('../../connection');

const update_menu_item = async function (item_id, updated_item) {
  
  const queryParam = [updated_item.item_name,
     updated_item.price, 
     updated_item.calories, 
     updated_item.allergens, 
     updated_item.halal, 
     updated_item.picture, 
     updated_item.description, 
     updated_item.item_label, 
     updated_item.quantity, 
     updated_item.active, 
     item_id];

  try {
   const result= await db.query(` UPDATE menu_items
    SET 
      item_name = COALESCE($1, item_name),
      price = COALESCE($2, price),
      calories = COALESCE($3, calories),
      allergens = COALESCE($4, allergens),
      halal = COALESCE($5, halal),
      picture = COALESCE($6, picture),
      description = COALESCE($7, description),
      item_label = COALESCE($8, item_label),
      quantity = COALESCE($9, quantity),
      active = COALESCE($10, active)
    WHERE item_id = $11 RETURNING *;`, queryParam);

    console.log("Menu item updated", result.rows[0]);
    return result.rows[0];
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = update_menu_item;
