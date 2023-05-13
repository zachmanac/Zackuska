import React, { useState } from "react";
import CartItem from "./CartItem";
import "./Cart.scss";
import { Button } from "react-bootstrap";
import ApiCalls from "../ApiCalls";

function Cart(props) {
  const { cartItems, handleRemoveFromCart } = props;

  const [cart, setCart] = useState(cartItems);


  const handleRemoveClick = (itemToRemove) => {
    const index = cart.findIndex((item) => item.item_id === itemToRemove.item_id);
      if (index !== -1) {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
      }
  handleRemoveFromCart(itemToRemove);
  };
  

    // Group items by name and calculate total quantity
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
    const totalAmount = calculateTotalCartPrice();
    const totalCalories = calculateTotalCartCalories();

    ApiCalls.checkoutCart(cart, totalAmount, totalCalories, (response) => {
      // Handle the response after checkout

      if (response.status === 200) {
        alert('Checkout successful!');
        // Clear the cart for a new session
        setCart([]);
        console.log("response success", response);
        window.location.href="localhost:3000/order";
      } else {
        // Checkout failed
        alert('Checkout failed. Please try again or contact customer support.');
        console.log("response fail", response);
      }
    });

  };

  return (
    <div>
      <h2>My Cart</h2>
      <div className="price-container">
        {cart && cart.length === 0 && <div className="empty-cart">Your cart is empty</div>}
        {Object.values(groupedItems).map((item) => (
          <CartItem key={item.item_id} item={item} handleRemoveClick={handleRemoveClick} />
        ))}
        {cart && cart.length > 0 && (
          <div className="cart-total-button">
            <Button variant="primary" onClick={handleCheckoutClick}>
              Checkout
            </Button>
            <h3 className="total-cart-price">Total Cart Price: ${calculateTotalCartPrice()}</h3>
            <h3 className="total-cart-price">Total Cart Calories: {calculateTotalCartCalories()}</h3>
          </div>
        )}
      </div>
    </div>
  );

}

export default Cart;