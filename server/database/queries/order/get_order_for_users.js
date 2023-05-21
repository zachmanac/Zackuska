const db = require('../../connection');

const getOrderForUsers = async function(user_id) {
  const queryParam = [user_id];
  try {
    const result = await db.query(`
      SELECT o.*, t.truck_name, t.picture, t.phone_number, mi.item_id, mi.item_name, mi.price, od.quantity
      FROM orders o
      INNER JOIN order_details od ON o.order_id = od.order_id
      INNER JOIN menu_items mi ON od.item_id = mi.item_id
      INNER JOIN trucks t ON o.truck_id = t.truck_id
      WHERE o.customer_id = $1
      ORDER BY o.date DESC`, queryParam);

    const orders = [];
    const orderMap = new Map();

    for (const row of result.rows) {
      const { order_id, customer_id, truck_id, status, total_amount, total_calories, date, response, item_id, item_name, price, quantity, truck_name, truck_picture, phone_number } = row;

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
          truck: {
            name: truck_name,
            picture: truck_picture,
            phone_number: phone_number
          }
        };
        orderMap.set(order_id, order);
        orders.push(order);
      }

      const menuItem = {
        item_id: item_id,
        quantity: quantity,
        item_name,
        price
      };
      order.menu_items.push(menuItem);
    }

    console.log(JSON.stringify(orders, null, 2)); // Convert orders to JSON string for better object representation
    return orders;
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = getOrderForUsers;
