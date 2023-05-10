DROP TABLE IF EXISTS trucks CASCADE;
CREATE TABLE trucks (
  truck_id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  truck_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  cuisine VARCHAR(50),
  instagram VARCHAR(255),
  facebook VARCHAR(255),
  website VARCHAR(255),
  picture VARCHAR(255),
  city VARCHAR(50) NOT NULL
);