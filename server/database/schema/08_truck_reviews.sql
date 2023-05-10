DROP TABLE IF EXISTS truck_reviews CASCADE;
CREATE TABLE truck_reviews (
  review_id INTEGER PRIMARY KEY NOT NULL,
  truck_id INTEGER REFERENCES trucks(truck_id) ON DELETE CASCADE
  
);