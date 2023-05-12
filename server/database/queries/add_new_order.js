const db = require('../connection');

const add_new_order = async function(customer_id, truck_id, status, total_amount, total_calories, date, details) {
  const queryParam = [customer_id, truck_id, status, total_amount, total_calories, date];

  try {
    // Insert the order into the orders table
    const orderResult = await db.query(`
      INSERT INTO orders (customer_id, truck_id, status, total_amount, total_calories, date)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING order_id`, queryParam);

    const order_id = orderResult.rows[0].order_id;

    // Insert the order details into the order_details table
    const orderDetailPromises = details.map(async item => {
      const { item_id, quantity } = item;
      await db.query(`
        INSERT INTO order_details (order_id, item_id, quantity)
        VALUES ($1, $2, $3)`, [order_id, item_id, quantity]);
    });

    await Promise.all(orderDetailPromises);

    console.log("New Order Added");
    
  } catch (err) {
    console.error("Error", err);

  }
};

module.exports = add_new_order;
