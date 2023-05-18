const db = require('../../connection');

const checkoutCart = async (req) => {
  try {
    // Retrieve the cart data from the session
    const { sessionCart, userId, truckId } = req.session;

    // Copy the cart items to the order table in the database
    const query = `
      INSERT INTO orders (user_id, truck_id, item_id, quantity)
      VALUES ($1, $2, $3, $4)
      RETURNING order_id;
    `;

    const values = sessionCart.map((item) => [userId, truckId, item.itemId, item.quantity]);

    const { rows } = await db.query(query, values);

    // Remove all cart items from the session
    req.session.sessionCart = [];

    // Return the generated order ID
    return rows[0].order_id;
  } catch (error) {
    throw new Error('Failed to process checkout');
  }
};

module.exports = { checkoutCart };
