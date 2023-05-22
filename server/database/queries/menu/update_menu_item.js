const db = require('../../connection');

const updateMenuItem = async (itemId, updatedData) => {

  const queryParams = [
    updatedData.item_name,
    updatedData.price,
    updatedData.calories,
    updatedData.allergens,
    updatedData.halal,
    updatedData.picture,
    updatedData.description,
    updatedData.active,
    itemId
  ];

  try {
    const result = await db.query(`
      UPDATE menu_items
      SET item_name = $1,
          price = $2,
          calories = $3,
          allergens = $4,
          halal = $5,
          picture = $6,
          description = $7,
          active = $8
      WHERE item_id = $9
      RETURNING *
    `, queryParams);

    const updatedMenuItem = result.rows[0];
    console.log("Menu item updated:", updatedMenuItem);
    return updatedMenuItem;
  } catch (err) {
    console.log("Error", err);
    throw err;
  }
};

module.exports = updateMenuItem;