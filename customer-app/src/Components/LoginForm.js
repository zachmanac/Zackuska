import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const server = axios.create({
  baseURL: 'http://localhost:8080',
});

function LoginForm({ handleClose, handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('customer');

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(email, password);
  };

  const loginUser = (email, password) => {
    server
      .post('/api/session', {
        email,
        password,
        user_type: userType,
      }, {withCredentials: true})
      .then((response) => {
        console.log('Success:', response.data);
        setEmail('');
        setPassword('');
        handleLogin(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    console.log(`Logging in user with email ${email} and password ${password}`);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}

export default LoginForm;
