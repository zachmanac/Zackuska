import React, { useEffect, useContext } from 'react';
import './Navbar.scss';
import SearchBar from './SearchBar';
import { Button, Modal, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import { ModalContext } from './ModalContext';
import Cart from './Cart';

function Navbar() {
  const {
    showRegistrationModal,
    setShowRegistrationModal,
    showLoginModal,
    setShowLoginModal,
    isLoggedIn,
    setIsLoggedIn,
    onRemoveFromCart,
    onAddToCart
  } = useContext(ModalContext);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSendCarttoBackEnd = (event) => {
    event.preventDefault();
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      window.location.href = '/cart';
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.href="/";
  };

  const handleLogin = (user) => {
    sessionStorage.setItem('user', JSON.stringify(user));
    setIsLoggedIn(true);
  setShowLoginModal(false); // Close the login modal
  };

  return (
    <nav className="nav-bar">
      <div className="nav-bar-left">
        <a href="/">
          <img src="../../logo.png" alt="Logo" className='logo'/>
        </a>
        <a href="/">Home</a>
        {isLoggedIn && <a href="/orders" style={{ color: 'orange' }}>My orders</a>}
        </div>

      <div className="nav-bar-center">
        <SearchBar />
      </div>

      {!isLoggedIn && (
        <div className="prompt-login">
          <Alert variant="warning">Please log in or sign up to add items to the cart.</Alert>
        </div>
      )}

      <div className="nav-bar-right">
        <div>
          <Link to="/cart">
            <Button variant="primary" onClick={handleSendCarttoBackEnd}>
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
            <Button variant="primary" onClick={() => setShowLoginModal(true)}>
              Login
            </Button>
            <Button variant="secondary" onClick={() => setShowRegistrationModal(true)}>
              Sign Up
            </Button>
          </>
        )}
        <Modal
          show={showRegistrationModal}
          onHide={() => setShowRegistrationModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RegistrationForm handleClose={() => setShowRegistrationModal(false)} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowRegistrationModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoginForm handleClose={() => setShowLoginModal(false)} handleLogin={handleLogin} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </nav>
  );
}

export default Navbar;
