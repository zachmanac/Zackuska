import React from 'react';
import './Navbar.scss';
import SearchBar from './SearchBar';
import Cart from './Cart';

function Navbar(props) {

  const { cartItems, handleRemoveFromCart } = props

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
        <Cart cartItems={cartItems} handleRemoveFromCart={handleRemoveFromCart} />
      </div>
        Login stuff
      </div>
    </nav>
  );
}

export default Navbar;