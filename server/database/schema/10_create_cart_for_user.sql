CREATE TABLE carts (
  cart_id SERIAL PRIMARY KEY,
  user_id INTEGER,
  food_truck_id INTEGER,
  item_id INTEGER,
  quantity INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
