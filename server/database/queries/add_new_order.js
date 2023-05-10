const db = require('../connection');

//Im working in this one STILL
const add_new_order = async function (customer_id, //how to add another query
  truck_id, status, total_amount, total_calories, date, details) {//details is array for the table order_details [{item_id:1, quantity: 3}, {item_id: 2, quantity:1}]

  const queryParam = [customer_id,
    truck_id, status, total_amount, total_calories, date];


  try {
    const order = await db.query(` INSERT INTO orders (customer_id,
      truck_id, status, total_amount, total_calories, date)
    VALUES
    ($1,$2,$3,$4,$5, $6) RETURNING order_id`, queryParam);

    const order_details = items.map(item => {
      return db.none('INSERT INTO order_details (order_id,item_id, quantity) VALUES ($1, $2, $3)', [order.id, item.item_id, item.quantity]);
    });
    await Promise.all(order_details);
    resizeBy.send("New Order Added");
  }

  catch (err) {
    console.log("Error", err);
  }
};

module.exports = add_new_order;
