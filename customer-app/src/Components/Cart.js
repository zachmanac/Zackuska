import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Cart.scss";
import PaymentForm from '../Components/PaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderConfirmationModal from './OrderConfirmationModal';  


const stripePublicKey = "pk_test_51I6VmWH67yKbwOmGGmpiEitNjqEKh6mpYczMUyTmdW7IMVh3I5uKFFYXreM4OFXzTiLQu9H6PyCFrNWtCAUEnkCn00qoW806h6";
const stripePromise = loadStripe(stripePublicKey);

const server = axios.create({
  baseURL: 'http://localhost:8080',
});

function Cart({ cartItems, setCartItems }) {
  const [showPayment, setShowPayment] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const user = window.sessionStorage.getItem('user');
  const userId = JSON.parse(user).user_id;
  console.log("userid", userId)

  useEffect(() => {
    window.localStorage.setItem(`cart-${userId}`, JSON.stringify(cartItems));
  }, [cartItems, userId]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((prevItem) => prevItem.item_id === item.item_id);
      if (existingItemIndex !== -1) {
        // If item exists in cart, update the quantity
        return prevItems.map((prevItem, i) =>
          i === existingItemIndex ? { ...prevItem, quantity: prevItem.quantity + 1 } : prevItem
        );
      } else {
        // If item does not exist in cart, add it
        return [...prevItems, item];
      }
    });
  };

  const removeFromCart = (itemIndex) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      const itemToRemove = updatedItems[itemIndex];

      if (itemToRemove.quantity > 1) {
        // If item quantity is more than 1, reduce the quantity
        updatedItems[itemIndex] = { ...itemToRemove, quantity: itemToRemove.quantity - 1 };
      } else {
        // If item quantity is 1, remove the item from cart
        updatedItems.splice(itemIndex, 1);
      }

      return updatedItems;
    });
  };

  const adjustQuantity = (index, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item, i) => (i === index ? { ...item, quantity: newQuantity } : item))
    );
  };

  const checkout = async () => {
    setShowPayment(true);
    console.log('Checkout clicked, showPayment:', showPayment);
    console.log("cartitems in checkout", cartItems);

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalCalories = cartItems.reduce((total, item) => total + item.calories * item.quantity, 0); // Assumes each item has a 'calories' property
    console.log("userid", userId);

    const menu_items = cartItems.map((item) => {
      return {[item.item_id]: item.quantity};
    })
    const orderResponse = await server
    .post(`/api/cart/checkout`, {
      user_id: userId, // Use 'user_id' to match server-side code
      truck_id: cartItems[0].truck_id, // need to determine the truck_id,
      menu_items: menu_items, // Use 'menu_items' to match server-side code
      total_amount: totalAmount,
      total_calories: totalCalories
    });

    if (orderResponse.status === 200) {
      console.log('Order placed:', orderResponse.data);
      setCartItems([]); // Clear the cart
    } else {
      console.error('Order placement failed');
    }
  };

  const handlePayment = async (paymentData) => {
    // Handle payment submission using paymentData
    // Make the API call to process the payment and create an order
    const paymentResponse = await server
      .post(`/api/payments`, {
        userId,
        cartItems,
        paymentData,
      });

    if (paymentResponse.status === 200) {
      const orderResponse = await server
      .post(`/api/orders`, {
        userId,
        cartItems,
        paymentId: paymentResponse.data.id,
      })
      setCartItems([]);
      if (orderResponse.status === 200) {
        console.log('Order placed:', orderResponse.data);
        setOrderId(orderResponse.data.id);
        // Clear the cart
        setCartItems([]);
        window.localStorage.removeItem(`cart-${userId}`);
        setShowPayment(false); // hide the payment form
        // Redirect to Orders page
        //mhistory.push('/orders');
      }
    } else {
      setCartItems([]);
        console.error('Payment failed');
    }
  };

  // Calculate the subtotal of the cart
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Replace this with the actual tax rate fetched from the truck owner's profile
  const taxRate = 0.1; // 10% tax rate

  // Calculate the tax amount based on the subtotal and tax rate
  const taxAmount = subtotal * taxRate;

  // Calculate the total amount including the tax
  const totalAmount = subtotal + taxAmount;

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      {cartItems.map((item, index) => (
        <div key={index} className="cart-item">
          <div className="item-details">
            <div className="item-table">
              <div className="item-row">
                <p className="item-name">{item.item_name}</p>
                <p className="item-price">${parseFloat(item.price).toFixed(2)}</p>
                <p className="item-quantity">{item.quantity}</p>
                <p className="item-total">${parseFloat(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="item-actions">
            <button
              className="quantity-button minus"
              onClick={() => adjustQuantity(index, item.quantity - 1)}
            >
              -
            </button>
            <button
              className="quantity-button"
              onClick={() => adjustQuantity(index, item.quantity + 1)}
            >
              +
            </button>
            <button className="remove-button" onClick={() => removeFromCart(index)}>
              Remove from cart
            </button>
          </div>
        </div>
      ))}

      <div className="subtotal">
        <p>Subtotal: ${parseFloat(subtotal).toFixed(2)}</p>
        <p>Tax: ${parseFloat(taxAmount).toFixed(2)}</p>
        <p>Total: ${parseFloat(totalAmount).toFixed(2)}</p>
      </div>

      {!showPayment && (
        <button className="checkout-button" onClick={checkout}>
          Checkout
        </button>
      )}

      {showPayment && (
          <Elements stripe={stripePromise}>
            <div className="payment-section">
            <PaymentForm handlePayment={handlePayment} cartItems={cartItems} />
            </div>
          </Elements>
      )}
      {orderId && (
        <OrderConfirmationModal orderId={orderId} onOrderAccepted={() => { /* Your logic here */ }} />
      )}      
    </div>
  );
}

export default Cart;

