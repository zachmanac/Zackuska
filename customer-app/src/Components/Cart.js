import React from "react";
import CartItem from "./CartItem";

function Cart(props) {
  const { cartItems, onRemoveFromCart } = props;

  const handleRemoveClick = (item) => {
    onRemoveFromCart(item);
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems && cartItems.length === 0 && <div>Cart is empty</div>}
      {cartItems && cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
  </div>
  );

}

export default Cart;