import React from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import './PaymentForm.scss';

function PaymentForm({ cartItems }) {
    const stripe = useStripe();
    const elements = useElements();
  
    const CARD_ELEMENT_OPTIONS = {
      style: {
        base: {
          color: "#303238",
          fontSize: "18px",
          fontFamily: "sans-serif",
          fontSmoothing: "antialiased",
          "::placeholder": {
            color: "#CFD7DF"
          }
        },
        invalid: {
          color: "#e5424d",
          ":focus": {
            color: "#303238"
          }
        }
      }
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (!stripe || !elements) {
        return;
      }
  
      const cardNumberElement = elements.getElement(CardNumberElement);
      const cardExpiryElement = elements.getElement(CardExpiryElement);
      const cardCvcElement = elements.getElement(CardCvcElement);

      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumberElement,
      });
  
      if (error) {
        console.log('Error:', error);
        return;
      }
  
      const paymentIntentRes = await axios.post('http://localhost:8080/api/payment/create-payment-intent', {
        items: cartItems,
    });

      

      const confirmPaymentRes = await stripe.confirmCardPayment(
        paymentIntentRes.data.clientSecret,
        {
          payment_method: paymentMethod.id
        }
      );

      if (confirmPaymentRes.error) {
        console.log(confirmPaymentRes.error.message);
        return;
      }

      // Save order to database
      console.log("Payment successful");
    };
    
    return (
        <div className="payment-form">
          <h1>Payment Form</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Card Number
                <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
              </label>
            </div>
            <label>
              Expiry Date
              <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
            </label>
            <label>
              CVC
              <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
            </label>
            <div className="address-section">
              <label>
                Country
                <input name="country" type="text" required />
              </label>
              <label>
                Postal Code
                <input name="postalCode" type="text" required />
              </label>
            </div>
            <button type="submit" disabled={!stripe}>Pay</button>
          </form>
        </div>
      );
    }
    
export default PaymentForm;
