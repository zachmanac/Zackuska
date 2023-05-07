DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY NOT NULL,
  customer_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  truck_id INTEGER REFERENCES trucks(truck_id) ON DELETE CASCADE,
  status VARCHAR(255) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  total_calories INTEGER NOT NULL DEFAULT 0,
  date TIMESTAMP NOT NULL
  
);