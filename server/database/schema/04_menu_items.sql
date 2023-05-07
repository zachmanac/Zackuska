DROP TABLE IF EXISTS menu_items CASCADE;
CREATE TABLE menu_items (
  item_id SERIAL PRIMARY KEY NOT NULL,
  truck_id INTEGER REFERENCES trucks(truck_id) ON DELETE CASCADE,
  item_name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  calories INTEGER NOT NULL DEFAULT 0,
  allergens VARCHAR(255) NOT NULL,
  halal BOOLEAN NOT NULL DEFAULT FALSE,
  picture VARCHAR(255),
  description TEXT NOT NULL
  
);