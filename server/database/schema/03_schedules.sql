DROP TABLE IF EXISTS schedules CASCADE;
CREATE TABLE schedules (
  schedule_id SERIAL PRIMARY KEY NOT NULL,
  truck_id INTEGER REFERENCES trucks(truck_id) ON DELETE CASCADE,
  date DATE NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude  DECIMAL(9,6),
  longitude DECIMAL(9,6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  place_name VARCHAR(255)
  
  
);


