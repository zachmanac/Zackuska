const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-payment-intent', async (req, res) => {
  const { amount, truckId, items } = req.body;

  if (items) {
    // If items are provided, calculate total price
    const totalPrice = calculateTotalPrice(items);

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice,
      currency: 'usd',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });

  } else if (amount && truckId) {
    // If amount and truckId are provided, proceed with original logic

    // Fetch the truck data from your database
    const truckResult = await db.query('SELECT * FROM trucks WHERE id = $1', [truckId]);
    const truck = truckResult.rows[0];
    if (!truck) {
      return res.status(404).json({ error: 'Truck not found' });
    }

    // Create a new Payment Intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'cad',
      transfer_data: {
        // Using the Stripe account ID from the truck data
        destination: truck.stripeAccountId,
      },
      application_fee_amount: parseInt(amount * 0.1), // Your platform's 10% fee
    });

    res.json({ client_secret: paymentIntent.client_secret });
  } else {
    res.status(400).json({ error: 'Invalid request' });
  }
});

function calculateTotalPrice(items) {
  let total = 0;
  items.forEach(item => {
    // Assuming each item is an object with 'price' and 'quantity' properties
    total += item.price * item.quantity;
  });
  // convert the total to cents (Stripe's required format for amounts)
  total = total * 100;
  return Math.round(total); // round it to avoid cents fractions
}

module.exports = router;
