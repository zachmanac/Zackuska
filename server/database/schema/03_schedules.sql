DROP TABLE IF EXISTS schedules CASCADE;
CREATE TABLE schedules (
  schedule_id SERIAL PRIMARY KEY NOT NULL,
  truck_id INTEGER REFERENCES trucks(truck_id) ON DELETE CASCADE,
  date DATE,
  address VARCHAR(255) NOT NULL,
  latitude  VARCHAR(30),/*look into GEOGRAPHY*/
  longitude VARCHAR(30),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  place_name VARCHAR(255)
  
  
);