import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  // Function to handle user login
  const login = async (email, password) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      
      if (response.ok) {
          const data = await response.json();
          console.log('data', data.user_id);
        setUser(data.user_id);
        // Perform any necessary actions after successful login
      } else {
        // Handle login error
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle login error
    }
  };

  // Function to handle user registration
  const register = async (name, lastName, email, password) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, lastName, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        // Perform any necessary actions after successful registration
      } else {
        // Handle registration error
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Error registering:', error);
      // Handle registration error
    }
  };

  // Function to handle user logout
  const logout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });

      if (response.ok) {
        setUser(null);
        // Perform any necessary actions after successful logout
      } else {
        // Handle logout error
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle logout error
    }
  };

  // Function to toggle the visibility of the login form
  const toggleLoginForm = () => {
    setShowLoginForm((prevState) => !prevState);
  };

  // Function to toggle the visibility of the register form
  const toggleRegisterForm = () => {
    setShowRegisterForm((prevState) => !prevState);
  };

  // Function to check if a user is logged in
  const checkUserLoggedIn = async () => {
    console.log("somethinginMexico")
    try {
        console.log("something")
      const response = await fetch('http://localhost:8080/checkLoggedIn');

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        setUser(null);
      } 
      console.log('Response:', response); // Add this line to log the response

    } catch (error) {
      console.error('Error checking user logged in status:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  console.log('user:', user); // Add this line to log the user value


  // Render loading state while checking user logged in status
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider 
    value={{ 
        user, 
        login, 
        register, 
        logout, 
        toggleLoginForm, 
        // toggleRegisterForm,
        showLoginForm,
        // showRegisterForm,
        }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
