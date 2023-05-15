const db = require('../../connection');

const addNewOrder = async function (customer_id, truck_id, status, total_amount, total_calories, menu_items) {
  try {
    //const date = new Date(); // Current timestamp

    // Calculate total_amount and total_calories
    //const { total_amount, total_calories } = await calculateTotals(menu_items);

    // Insert the order into the orders table
    const orderResult = await db.query(`
      INSERT INTO orders (customer_id, truck_id, status, total_amount, total_calories, date)
      VALUES ($1, $2, $3, $4, $5, now())
      RETURNING *`,
      [customer_id, truck_id, status, total_amount, total_calories]
    );

    const order = orderResult.rows[0];
    console.log("order after inserted", order);
    const order_id = order.order_id; // Get the generated order ID

    // Insert the order details into the order_details table
    const orderDetailPromises = menu_items.map(async (item) => {
      const { item_id, quantity } = item;
      await db.query(`
        INSERT INTO order_details (order_id, item_id, quantity)
        VALUES ($1, $2, $3)`,
        [order_id, item_id, quantity]
      );
    });

    await Promise.all(orderDetailPromises);

    console.log('New order created successfully');
    return order;
  } catch (error) {
    console.error('Error creating new order:', error);
    throw error;
  }
};
/*
// Helper function to calculate total_amount and total_calories
async function calculateTotals(menu_items) {
  let total_amount = 0;
  let total_calories = 0;

  for (const item of menu_items) {
    const { item_id, quantity } = item;
    const itemData = await getItemData(item_id); // Retrieve item data from menu_items table

    // Perform calculations based on itemData and quantity
    const itemPrice = itemData.price;
    const itemCalories = itemData.calories;

    total_amount += itemPrice * quantity;
    total_calories += itemCalories * quantity;
  }

  return { total_amount, total_calories };
}

// Helper function to retrieve item data from menu_items table
async function getItemData(item_id) {
  const result = await db.query(`
    SELECT price, calories
    FROM menu_items
    WHERE item_id = $1`,
    [item_id]
  );

  return result.rows[0];
}*/

module.exports = addNewOrder;

