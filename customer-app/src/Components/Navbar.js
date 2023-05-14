import React, { useState, useEffect } from 'react';
import './Navbar.scss';
import SearchBar from './SearchBar';
import Cart from './Cart';
import ApiCalls from '../ApiCalls';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';

function Navbar(props) {
  const { cartItems, handleRemoveFromCart } = props;

  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in (you can modify this logic based on your authentication implementation)
    const user = sessionStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSendCarttoBackEnd = function (cartArray) {
    console.log(cartArray);
    // once i get backend express route working, this should work
    // ApiCalls.sendCart(cartArray).then(() => {
    //   window.location.href ='http://localhost:3000/cart';
    // })
  };

  const handleShowRegistrationModal = () => {
    setShowRegistrationModal(true);
  };

  const handleCloseRegistrationModal = () => {
    setShowRegistrationModal(false);
  };

  const handleShowLoginModal = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleLogin = (user) => {
    sessionStorage.setItem('user', JSON.stringify(user));
    setIsLoggedIn(true);
    handleCloseLoginModal();
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <nav className="nav-bar">
      <div className="nav-bar-left">
        <p>Logo here</p>
        <a href="/">Home</a>
      </div>

      <div className="nav-bar-center">
        <SearchBar />
      </div>

      <div className="nav-bar-right">
        <div>
          <Link to="/cart">
            <Button
              variant="primary"
              onClick={() => handleSendCarttoBackEnd(cartItems)}
            >
              Cart
            </Button>
          </Link>
        </div>
        {isLoggedIn ? (
          <Button variant="secondary" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Button variant="primary" onClick={handleShowLoginModal}>
              Login
            </Button>
            <Button variant="secondary" onClick={handleShowRegistrationModal}>
              Sign Up
            </Button>
          </>
        )}
        <Modal
          show={showRegistrationModal}
          onHide={handleCloseRegistrationModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RegistrationForm handleClose={handleCloseRegistrationModal} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseRegistrationModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoginForm handleClose={handleCloseLoginModal}
                        handleLogin={handleLogin}
                        />
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseLoginModal}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </nav>
              );
              }
              
              export default Navbar;
              
