import React, { useEffect, useContext } from 'react';
import './Navbar.scss';
import { Button, Modal, Alert } from 'react-bootstrap';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import { ModalContext } from './ModalContext';
import axios from 'axios';

const server = axios.create({
  baseURL: 'http://localhost:8080',
});

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
    server.get('/api/session', { withCredentials: true })
      .then((response) => {
        setIsLoggedIn(true);
      })
      .catch((error) => {
        setIsLoggedIn(false);
      });
  }, []);

  const handle = () => {
    server.delete('/api/session')
      .then((response) => {
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setShowLoginModal(false); // Close the login modal
  };

  return (
    <nav className="nav-bar">
      <div className="nav-bar-left">
        <p>Logo here</p>
        <a href="/">Home</a>
      </div>

      {!isLoggedIn && (
        <div className="prompt-login">
          <Alert variant="warning">Please log in or sign up to view your truck information.</Alert>
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
            <RegistrationForm handleClose={() => setShowRegistrationModal(false)} user_type={'owner'} />
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
