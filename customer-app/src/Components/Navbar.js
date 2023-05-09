import React from 'react';
import './Navbar.scss';
import { useAuth0 } from '@auth0/auth0-react';
import SearchBar from './SearchBar';
import Cart from './Cart';

function Navbar() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

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
        <Cart />
      </div>
        {isAuthenticated ? (
          <div>
            <div>
              <a href="/profile">{user.name}</a>
            </div>
            <div>
              <a href="#" onClick={() => logout()}>Logout</a>
            </div>
          </div>
        ) : (
          <div>
            <a href="#" onClick={() => loginWithRedirect()}>Login</a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;