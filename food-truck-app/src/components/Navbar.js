import React, { useEffect, useContext } from 'react';
import './Navbar.scss';
import { Button, Modal, Alert } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import { ModalContext } from './ModalContext';
import axios from 'axios';
axios.defaults.withCredentials = true;

function Navbar() {
  const {
    showRegistrationModal,
    setShowRegistrationModal,
    showLoginModal,
    setShowLoginModal,
    isLoggedIn,
    setIsLoggedIn,
  } = useContext(ModalContext);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    axios.delete('http://localhost:8080/api/session', {withCredentials: true});
    sessionStorage.removeItem('user');
    setIsLoggedIn(false);
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
      </div>

      {!isLoggedIn && (
        <div className="prompt-login">
          <Alert variant="warning">Please log in or sign up to view your truck information.</Alert>
        </div>
      )}

      {isLoggedIn && (
        <div className='nav-bar-middle'>
          <a href="/orders">Current Orders</a>
          <a href="/order-history">Order History</a>
          <a href="/menu">Menu</a>
          <a href="/truck-info">Truck Info</a>
        </div>
      )}

      <div className="nav-bar-right">
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
            <RegistrationForm handleClose={() => setShowRegistrationModal(false)} user_type= {'owner'} />
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
            <LoginForm handleClose={() => setShowLoginModal(false)} handleLogin={handleLogin} user_type={'owner'} />
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
