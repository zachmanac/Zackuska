const db = require('../../connection');

const addMenuItemReview = async function (item_id, customer_id, rating, comment, date) {
  try {
    // Insert the review into the reviews table
    const result = await db.query(`
      INSERT INTO reviews (customer_id, rating, comment, date)
      VALUES ($1, $2, $3, $4) RETURNING *`,
      [customer_id, rating, comment, date]
    );

    // Insert the review into the menu_item_reviews table
    await db.query(`
      INSERT INTO menu_item_reviews (review_id, item_id)
      VALUES (currval('reviews_review_id_seq'), $1)`,
      [item_id]
    );

    console.log('Review added successfully');
    return [result.rows[0], item_id];
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

module.exports = addMenuItemReview;
