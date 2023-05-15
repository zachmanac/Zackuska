import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Cart.scss";


const server = axios.create({
  baseURL: 'http://localhost:8080',
});

function Cart({ cartItems, setCartItems}) {
  const userId = window.sessionStorage.getItem('userId');

  useEffect(() => {
    window.localStorage.setItem(`cart-${userId}`, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((prevItem) => prevItem.item_id === item.item_id);
      if (existingItemIndex !== -1) {
        // If item exists in cart, update the quantity
        return prevItems.map((prevItem, i) => i === existingItemIndex ? { ...prevItem, quantity: prevItem.quantity + 1 } : prevItem);
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

  const checkout = () => {
    server
      .post(`/api/orders`, {
        userId,
        cartItems,
      })
      .then((response) => {
        console.log('Order placed:', response.data);
        // Clear the cart
        setCartItems([]);
        window.localStorage.removeItem(`cart-${userId}`);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.map((item, index) => (
        <div key={index}>
          <h2>{item.item_name}</h2>
          <p>Price: {item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => adjustQuantity(index, item.quantity + 1)}>+</button>
          <button onClick={() => adjustQuantity(index, item.quantity - 1)}>-</button>
          <button onClick={() => removeFromCart(index)}>Remove from cart</button>
        </div>
      ))}
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}

export default Cart;
