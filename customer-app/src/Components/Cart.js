import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import "./Cart.scss";
import { Button } from "react-bootstrap";

function Cart(props) {
  const { cartItems, handleRemoveFromCart } = props;

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = sessionStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCart(parsedCart);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleRemoveClick = (itemToRemove) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => item.item_id !== itemToRemove.item_id
      );
      return updatedCart;
    });
    handleRemoveFromCart && handleRemoveFromCart(itemToRemove);
  };

  const groupedItems = cart.reduce((result, item) => {
    if (result[item.item_name]) {
      result[item.item_name].quantity += item.quantity;
    } else {
      result[item.item_name] = { ...item };
    }
    return result;
  }, {});

  const calculateTotalCartPrice = () => {
    let totalCartPrice = 0;
    cart.forEach((item) => {
      totalCartPrice += item.price * item.quantity;
    });
    return totalCartPrice;
  };

  const calculateTotalCartCalories = () => {
    let totalCartCalories = 0;
    cart.forEach((item) => {
      totalCartCalories += item.calories * item.quantity;
    });
    return totalCartCalories;
  };

  const handleCheckoutClick = () => {
    // Handle the checkout process
    // ...
  };

  return (
    <div>
      <h2>My Cart</h2>
      <div className="price-container">
        {cart && cart.length === 0 && (
          <div className="empty-cart">Your cart is empty</div>
        )}
        {Object.values(groupedItems).map((item) => (
          <CartItem
            key={item.item_id}
            item={item}
            handleRemoveClick={handleRemoveClick}
          />
        ))}
        {cart && cart.length > 0 && (
          <div className="cart-total-button">
            <Button variant="primary" onClick={handleCheckoutClick}>
              Checkout
            </Button>
            <h3 className="total-cart-price">
              Total Cart Price: ${calculateTotalCartPrice()}
            </h3>
            <h3 className="total-cart-price">
              Total Cart Calories: {calculateTotalCartCalories()}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
