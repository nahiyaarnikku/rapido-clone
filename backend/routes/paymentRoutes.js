// routes/paymentRoute.js (For handling payments using Stripe)

const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51LokRoSIzhZEMyrFd8wgPNcuHbYSIgSxjhtRyW8dEFNcu3OSEjdtxklqb6rCezocYSQ4lQTq73MDCpg4dZuMsLia00ktPeebLT'); // Replace with your actual Stripe secret key

// Create a payment session
router.post('/create-payment', async (req, res) => {
  try {
    const { amount } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'Vehicle Booking', // Change this to your product name
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success', // Replace with your success URL
      cancel_url: 'http://localhost:3000/cancel', // Replace with your cancel URL
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating payment session.' });
  }
});

module.exports = router;
