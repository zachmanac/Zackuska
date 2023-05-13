/*const db = require('../../connection');

// Function to create a new cart for the user
const createCartForUser = async function (user_id) {
  const queryParam = [user_id];
  try {
    const result = await db.query(`INSERT INTO carts(user_id) VALUES($1) RETURNING *`, queryParam);
    const newCart = result.rows[0]; // Get the newly created cart from the result
    console.log('New cart created successfully', newCart);
    return newCart;
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = createCartForUser;*/
