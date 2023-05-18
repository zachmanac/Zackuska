const express = require('express');
const { validateSession } = require('../actions/sessionActions');
const {
  addToCart,
  removeFromCart,
  removeItemFromCart,
} = require('../controllers/cartController');

const router = express.Router();

// Route: POST /api/cart
// Add an item to the cart
router.post('/', async (req, res) => {
  try {
    // Validate the session before allowing cart modifications
    validateSession(req);

    // Call the addToCart function to handle adding an item to the cart
    const { itemId } = req.body;
    await addToCart(req, itemId);

    // Return any relevant data or updated cart information
    res.status(200).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// Route: PATCH /api/cart/:itemId/increase
// Increase the quantity of an item in the cart
router.patch('/:itemId/increase', async (req, res) => {
  try {
    // Validate the session before allowing cart modifications
    validateSession(req);

    // Call the addToCart function to handle increasing the quantity of an item in the cart
    const { itemId } = req.params;
    await addToCart(req, itemId);

    // Return any relevant data or updated cart information
    res.status(200).json({ message: 'Item quantity increased successfully' });
  } catch (error) {
    console.error('Error increasing item quantity:', error);
    res.status(500).json({ error: 'Failed to increase item quantity' });
  }
});

// Route: PATCH /api/cart/:itemId/decrease
// Decrease the quantity of an item in the cart
router.patch('/:itemId/decrease', async (req, res) => {
  try {
    // Validate the session before allowing cart modifications
    validateSession(req);

    // Call the removeFromCart function to handle decreasing the quantity of an item in the cart
    const { itemId } = req.params;
    await removeFromCart(req, itemId);

    // Return any relevant data or updated cart information
    res.status(200).json({ message: 'Item quantity decreased successfully' });
  } catch (error) {
    console.error('Error decreasing item quantity:', error);
    res.status(500).json({ error: 'Failed to decrease item quantity' });
  }
});

// Route: DELETE /api/cart/:itemId
// Remove an item from the cart
router.delete('/:itemId', async (req, res) => {
  try {
    // Validate the session before allowing cart modifications
    validateSession(req);

    // Call the removeItemFromCart function to handle removing an item from the cart completely
    const { itemId } = req.params;
    await removeItemFromCart(req, itemId);

    // Return any relevant data or updated cart information
    res.status(200).json({ message: 'Item removed from cart successfully' });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});

module.exports = router;
