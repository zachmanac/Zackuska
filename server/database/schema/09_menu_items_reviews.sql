DROP TABLE IF EXISTS menu_item_reviews CASCADE;
CREATE TABLE menu_item_reviews (
  review_id INTEGER PRIMARY KEY NOT NULL,
  item_id INTEGER REFERENCES menu_items(item_id) ON DELETE CASCADE
  
);