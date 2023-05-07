DROP TABLE IF EXISTS reviews CASCADE;
CREATE TABLE reviews (
  review_id SERIAL PRIMARY KEY NOT NULL,
  customer_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
  rating SMALLINT NOT NULL DEFAULT 0,
  coment TEXT NOT NULL,
  date DATE
  
);