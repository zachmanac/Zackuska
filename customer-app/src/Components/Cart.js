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
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      {cartItems.map((item, index) => (
        <div key={index} className="cart-item">
          <div className="item-details">
            <div className="item-table">
              <div className="item-row">
                <p className="item-name">{item.item_name}</p>
                <p className="item-price">$ {item.price}</p>
                <p className="item-quantity">{item.quantity}</p>
              </div>
            </div>
          </div>
          <div className="item-actions">
            <button className="quantity-button minus" onClick={() => adjustQuantity(index, item.quantity - 1)}>-</button>
            <button className="quantity-button" onClick={() => adjustQuantity(index, item.quantity + 1)}>+</button>
            <button className="remove-button" onClick={() => removeFromCart(index)}>Remove from cart</button>
          </div>
        </div>
      ))}
      <button className="checkout-button">Checkout</button>
    </div>
  );
  
  
}

export default Cart;
