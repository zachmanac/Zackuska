const express = require('express');
const { validateSession } = require('../sessionActions');
const { checkoutCart } = require('../controllers/checkoutController');

const router = express.Router();

// Route: POST /api/checkout
// Checkout and process the cart
router.post('/', async (req, res) => {
  try {
    // Validate the session before allowing cart modifications
    validateSession(req);

    // Call the checkoutCart function to handle the checkout process
    const orderId = await checkoutCart(req);

    // Return the order ID in the response
    res.status(200).json({ orderId });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ error: 'Failed to process checkout' });
  }
});

module.exports = router;
