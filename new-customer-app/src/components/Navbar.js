import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { ModalContext } from '../contexts/ModalContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Modal, Button, Alert } from 'react-bootstrap';
import './Navbar.scss';


const Navbar = () => {
  const { user, logout, login, register } = useContext(AuthContext);
  const {showLoginModal, setShowLoginModal, showRegistrationModal, setShowRegistrationModal} = useContext(ModalContext);

  const handleLogout = () => {
    logout();
  };

  const handleLogin = () => { 
    setShowLoginModal(false); // Close the login modal
  };

  return (
    <nav className="nav-bar">
      <div className="nav-bar-left">
        <p>Logo here</p>
        <a href="/">Home</a>
      </div>

      <div className="nav-bar-center">{/* SearchBar */}</div>
      {/* {!user && (*/}
      <div className="prompt-login">
       <Alert variant="warning">Please log in or sign up to add items to the cart.</Alert>
        </div>
        <div className="nav-bar-right">
  <div>
    <Link to="/cart">
      <Button variant="primary" 
    //   onClick={handleSendCarttoBackEnd}
      >
        Cart
      </Button>
    </Link>
  </div>
  {user ? (
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
  <Modal show={showRegistrationModal} onHide={() => setShowRegistrationModal(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Register</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <RegisterForm handleClose={() => setShowRegistrationModal(false)} user_type={'customer'} />
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
      <LoginForm handleClose={() => setShowLoginModal(false)} handleLogin={handleLogin} user_type={'customer'} />
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
};

export default Navbar;
