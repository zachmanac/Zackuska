const express = require('express');
const router = express.Router();
const queryAddMenuItemReview = require('../../database/queries/review/add_menu_item_review');

// POST route to add a review for a specific menu item
router.post('/api/menu_items/:item_id/reviews', async (req, res) => {
  const { item_id } = req.params;
  const { customer_id, rating, comment, date } = req.body;

  try {
    // Call the queryAddMenuItemReview function to add the review to the database
    const review = await queryAddMenuItemReview(item_id, customer_id, rating, comment, date);

    res.json(review); // Send review
  } catch (error) {
    console.error('Failed to add review:', error);
    res.status(500).json({ error: 'Failed to add review' });
  }
});

module.exports = router;
