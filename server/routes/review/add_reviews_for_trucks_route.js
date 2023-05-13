const express = require('express');
const router = express.Router();
const queryAddTruckReview = require('../../database/queries/review/add_truck_review');

// POST route to add a review for a specific truck
router.post('/api/trucks/:truck_id/reviews', async (req, res) => {
  const { truck_id } = req.params;
  const { customer_id, rating, comment, date } = req.body;

  try {
    // Call the queryAddTruckReview function to add the review to the database
    const review=await queryAddTruckReview(truck_id, customer_id, rating, comment, date);

    res.json(review); // Send review
  } catch (error) {
    console.error('Failed to add review:', error);
    res.status(500).json({ error: 'Failed to add review' });
  }
});

module.exports = router;
