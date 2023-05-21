const db = require('../../connection');

const addNewOrder = async function (customer_id, truck_id, status, total_amount, total_calories, menu_items, response) {
  /*this is how menu_items look like menu_items=[ { "1": 2 },
    { "6": 1 }] item_id:quantity*/
  try {
    const orderResult = await db.query(`
      INSERT INTO orders (customer_id, truck_id, status, total_amount, total_calories, date, response)
      VALUES ($1, $2, $3, $4, $5, now(), $6)
      RETURNING *`,
      [customer_id, truck_id, status, Number(total_amount), total_calories, response]
    );

    const order = orderResult.rows[0];
    console.log("order after inserted", order);
    const order_id = order.order_id;
    console.log("menuitems", menu_items);

    const orderDetailPromises = menu_items.map(async (item) => {
      const item_id = parseInt(Object.keys(item)[0]); // Get the item_id as an integer
      const quantity = item[item_id]; // Get the quantity

      await db.query(`
        INSERT INTO order_details (order_id, item_id, quantity)
        VALUES ($1, $2, $3)`,
        [order_id, item_id, quantity]
      );
      const itemDataResult = await db.query(`
      SELECT item_name, price
      FROM menu_items
      WHERE item_id = $1`,
      [item_id]);
      const itemData = itemDataResult.rows[0];

      // Add additional properties to the item object
      item.item_name = itemData.item_name;
      item.total_price = itemData.price*quantity;
    });

    await Promise.all(orderDetailPromises);

    console.log('New order created successfully');
     order.menu_items= menu_items;
     console.log('order with menu items', order)
     return order;
  } catch (error) {
    console.error('Error creating new order:', error);
    throw error;
  }
};

module.exports = addNewOrder;

//this in case i dont get it from customer-app
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



