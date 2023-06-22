const db = require('../../connection');

const getOrderForTrucks = async function (truck_id) {
  const queryParam = [truck_id];
  try {
    const result = await db.query(`
      SELECT o.*, mi.item_id, mi.item_name, mi.price, od.quantity
      FROM orders o
      INNER JOIN order_details od ON o.order_id = od.order_id
      INNER JOIN menu_items mi ON od.item_id = mi.item_id
      WHERE o.truck_id = $1
      ORDER BY o.date DESC`, queryParam);

    const orders = [];
    const orderMap = new Map();

    for (const row of result.rows) {
      const { order_id, customer_id, truck_id, status, total_amount, total_calories, date, response, item_id, item_name, price, quantity } = row;

      let order;
      if (orderMap.has(order_id)) {
        order = orderMap.get(order_id);
      } else {
        order = {
          order_id,
          customer_id,
          truck_id,
          status,
          total_amount,
          total_calories,
          date,
          response,
          menu_items: [],
        };
        orderMap.set(order_id, order);
        orders.push(order);
      }

      const menuItem = {
        item_id,
        quantity,
        item_name,
        price,
      };
      order.menu_items.push(menuItem);
    }

    JSON.stringify(orders, null, 2);
    console.log(JSON.stringify(orders, null, 2)); // Convert orders to JSON string for better object representation
    return orders;
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = getOrderForTrucks;
