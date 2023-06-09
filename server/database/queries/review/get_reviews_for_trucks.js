const db = require('../../connection');

const getReviewsForTrucks = async function(truck_id){
  const queryParam=[truck_id];
  try {
    const result = await db.query(`SELECT r.review_id, r.rating, r.coment, r.date, u.name, u.last_name
    FROM reviews r
    JOIN users u ON r.customer_id= u.user_id
    INNER JOIN truck_reviews tr ON r.review_id = tr.review_id
    WHERE tr.truck_id = $1;`, queryParam);
    console.log(result.rows); //all reviews from a given truck
    return result.rows;
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = getReviewsForTrucks;
