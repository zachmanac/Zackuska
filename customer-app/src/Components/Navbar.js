import React from 'react';
import './Navbar.scss';
import SearchBar from './SearchBar';
import Cart from './Cart';
import ApiCalls from '../ApiCalls';
import { Button } from 'react-bootstrap';

function Navbar(props) {

  const { cartItems, handleRemoveFromCart } = props;

  const handleSendCarttoBackEnd = function(cartArray) {
    console.log(cartArray)

    // once i get backend express route working, this should work
    // ApiCalls.sendCart(cartArray).then(() => {
    //   window.location.href ='http://localhost:3000/cart';
    // })

  }


  return (
    <nav className='nav-bar'>
      <div className='nav-bar-left'>
        <p>Logo here</p>
        <a href="/">Home</a>
      </div>

      <div className='nav-bar-center'>
        <SearchBar />
      </div>

      <div className='nav-bar-right'>
      <div>
        <Button 
          variant="primary" 
          onClick={() => handleSendCarttoBackEnd(cartItems)}
        >
          Cart
        </Button>
      </div>
        Login stuff
      </div>
    </nav>
  );
}

export default Navbar;