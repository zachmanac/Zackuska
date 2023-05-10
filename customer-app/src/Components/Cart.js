import React from "react";
import CartItem from "./CartItem";
import "./Cart.scss";

function Cart(props) {
  const { cartItems, handleRemoveFromCart } = props;

  const handleRemoveClick = (item) => {
    handleRemoveFromCart(item);
  };

  return (
    <div>
      <h2>My Cart</h2>
      {cartItems && cartItems.length === 0 && <div className="empty-cart">Your cart is empty</div>}
      {cartItems && cartItems.map((item) => (
        <CartItem key={item.id} item={item} handleRemoveClick={handleRemoveClick} />
      ))}
    </div>
  );

}

export default Cart;