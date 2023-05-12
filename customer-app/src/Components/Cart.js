import React, { useState } from "react";
import CartItem from "./CartItem";
import "./Cart.scss";

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

  return (
    <div>
      <h2>My Cart</h2>
      {cart && cart.length === 0 && <div className="empty-cart">Your cart is empty</div>}
      {cart && cart.map((item) => (
        <CartItem key={item.id} item={item} handleRemoveClick={handleRemoveClick} />
      ))}
    </div>
  );

}

export default Cart;