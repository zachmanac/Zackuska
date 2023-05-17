import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
axios.defaults.withCredentials = true;

const server = axios.create({
  baseURL: 'http://localhost:8080',
});

function RegistrationForm({ handleClose, user_type}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [name, setName] = useState('');
  const [last_name, setLastName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform form validation
    if (!email || !password) {
      setError('Please fill in all the fields.');
      return;
    }

    const user = {
      name,
      last_name,
      email,
      password,
      user_type: user_type
    };

    server
      .post('/api/users', user)
      .then((response) => {
        console.log('User registered:', response.data);
        setSuccess('User registered successfully!');
        setEmail('');
        setPassword('');
        setError('');
      })
      .catch((error) => {
        console.error('Error registering user:', error);
        setSuccess('');
        setError('Failed to register user. Please try again.');
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form.Group controlId="formBasicName">
  <Form.Label>Name</Form.Label>
  <Form.Control
    type="text"
    placeholder="Enter your name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
  />
</Form.Group>

        
              <Form.Group controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your last name"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </Form.Group>
        
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
                Submit
              </Button>
            </Form>
          );
        }
        
        export default RegistrationForm;
        
