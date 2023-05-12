import React from 'react';
import { Button } from 'react-bootstrap';
import './CartItem.scss';

function CartItem(props) {
  const { item, handleRemoveClick } = props;
  console.log("item", item);

  return (
    <div className='cart-item-div'>
      <table className='cart-item-table'>
        <tbody>
          <tr className='cart-item-row'>
            <td className='cart-item-data'>
              <h3>{item.item_name}</h3>
            </td>
            <div className='item-details'>
              <td className='cart-item-data remove-button'>
                <Button variant="primary" onClick={() => handleRemoveClick(item)}>Remove From Cart</Button>
              </td>
              <td className='cart-item-data quantity'>
                Quantity: {item.quantity}
              </td>
              <td className='cart-item-data price'>
                Price: ${item.price}
              </td>
            </div>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CartItem;