import React, { useState } from "react";
import CartItem from "./CartItem";
import "./Cart.scss";
import { Button } from "react-bootstrap";

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
            <Button variant="primary">
              Checkout
            </Button>
            <h3 className="total-cart-price">Total Cart Price: ${calculateTotalCartPrice()}</h3>
          </div>
        )}
      </div>
    </div>
  );

}

export default Cart;