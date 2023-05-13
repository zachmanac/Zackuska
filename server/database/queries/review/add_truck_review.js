const db = require('../../connection');


const addTruckReview = async function (truck_id, customer_id, rating, comment, date) {
  try {
    // Insert the review into the reviews table
    const result = await db.query(`
      INSERT INTO reviews (customer_id, rating, comment, date)
      VALUES ($1, $2, $3, $4) RETURNING *`,
      [customer_id, rating, comment, date]
    );

    // Insert the review into the truck_reviews table
    await db.query(`
      INSERT INTO truck_reviews (review_id, truck_id)
      VALUES (currval('reviews_review_id_seq'), $1)`,
      [truck_id]
    );

    console.log('Review added successfully');
    return [result.rows[0], truck_id];
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

module.exports = addTruckReview;
