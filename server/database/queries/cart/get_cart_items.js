/*const db = require('../../connection');

// Function to fetch the cart items with quantities for a user
const get_cart_items = (user_id) => {
  return new Promise((resolve, reject) => {
    // Perform the necessary SQL query to retrieve the cart items with quantities
    const query = `
      SELECT ci.cart_id, ci.item_id, ci.quantity, m.item_name
      FROM cart_items ci
      JOIN carts c ON ci.cart_id = c.cart_id
      JOIN menu_items m ON ci.item_id = m.item_id
      WHERE c.user_id = $1
    `;
    const values = [user_id];

    // Execute the SQL query
    db.query(query, values)
      .then(result => {
        resolve(result.rows); // Return the cart items with quantities
      })
      .catch(error => {
        reject(error); // Error occurred while fetching the cart items
      });
  });
};

module.exports = get_cart_items;*/
