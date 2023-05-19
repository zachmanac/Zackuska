const db = require('../../connection');

const getItemByIdQuery = async function (itemId) {
  const queryParam = [itemId];
  try {
    const result = await db.query(`SELECT * FROM menu_items WHERE item_id = $1`, queryParam);
    return result.rows[0];
  } catch (err) {
    console.log("Error", err);
    throw new Error('Failed to retrieve item by ID');
  }
};

module.exports = getItemByIdQuery;
