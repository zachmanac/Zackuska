const db = require('../connection');

// Function to insert a cart item into the database
const insert_cart_item = (cart_id, food_truck_id, item_id, quantity) => {
    return new Promise((resolve, reject) => {
      // Perform the necessary SQL query to insert the cart item
      const query = `
        INSERT INTO cart_items (cart_id, food_truck_id, item_id, quantity)
        VALUES ($1, $2, $3, $4)
      `;
      const values = [cart_id, food_truck_id, item_id, quantity];
  
      // Execute the SQL query
      db.query(query, values)
        .then(() => {
          resolve(); // Cart item insertion successful
        })
        .catch(error => {
          reject(error); // Error occurred while inserting the cart item
        });
    });
  };
  
module.exports = insert_cart_item;
