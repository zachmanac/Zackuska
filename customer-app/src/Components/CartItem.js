import React from 'react';
import { Button } from 'react-bootstrap';

function CartItem(props) {
  const { item, handleRemoveClick } = props;
  console.log("item", item);

  return (
    <div>
      <h3>{item.name}</h3>
      <p>Price: {item.price}</p>
      <p>Quantity: {item.quantity}</p>
      <Button variant="primary" onClick={() => handleRemoveClick(item)}>Remove From Cart</Button>
    </div>
  );
}

export default CartItem;