const db = require('../../connection');

const getReviewsForItems = async function(item_id){
  const queryParam=[item_id];
  try {
    const result = await db.query(`SELECT r.review_id, r.rating, r.coment, r.date
    FROM reviews r
    INNER JOIN menu_item_reviews tr ON r.review_id = tr.review_id
    WHERE tr.item_id = $1;`, queryParam);
    console.log(result.rows); //all reviews from a given item
    return result.rows;
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = getReviewsForItems;
