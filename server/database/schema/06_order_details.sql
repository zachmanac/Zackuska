DROP TABLE IF EXISTS order_detail CASCADE;
CREATE TABLE order_details (
  order_detail_id SERIAL PRIMARY KEY NOT NULL,
  item_id INTEGER REFERENCES menu_items(item_id) ON DELETE CASCADE,
  order_id INTEGER REFERENCES orders(order_id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL
  
);