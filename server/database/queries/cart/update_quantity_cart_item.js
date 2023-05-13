/*
// Function to update the quantity of a cart item in the database
const update_quantity_cart_item = (cart_id, quantity) => {
    return new Promise((resolve, reject) => {
      // Perform the necessary SQL query to update the cart item quantity
      const query = `
        UPDATE cart
        SET quantity = $1
        WHERE cart_id = $2
      `;
      const values = [quantity, cart_id];
  
      // Execute the SQL query
      db.query(query, values)
        .then(() => {
          resolve(); // Cart item quantity update successful
        })
        .catch(error => {
          reject(error); // Error occurred while updating the cart item quantity
        });
    });
  };
  
  module.exports = update_quantity_cart_item;*/
  