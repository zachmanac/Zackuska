import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Navbar from './Components/Navbar';
import FoodTruckList from './Components/FoodTruckList';
import FoodTruckMenu from './Components/FoodTruckMenu';
import Cart from './Components/Cart';
import './App.scss';
import ApiCalls from './ApiCalls';
import { ModalContext } from './Components//ModalContext';
import Orders from './Components/Orders';
import axios from 'axios';

function FoodTruckMenuWrapper({ trucks, cartItems, isLoggedIn, handleAddToCart, handleRemoveFromCart }) {
  const { truckId } = useParams();

  return (
    <FoodTruckMenu
      truckId={truckId}
      trucks={trucks}
      onAddToCart={handleAddToCart}
      cartItems={cartItems}
      isLoggedIn={isLoggedIn}
      onRemoveFromCart={handleRemoveFromCart}
    />
  );
}

function App() {
const userId = window.sessionStorage.getItem('user_id');
const initialCart = JSON.parse(window.localStorage.getItem(`cartItems-${userId}`)) || [];
const [cartItems, setCartItems] = useState(() => {
  const savedCartItems = window.localStorage.getItem(`cartItems-${userId}`);
  return savedCartItems ? JSON.parse(savedCartItems) : [];
});
const [trucks, setTrucks] = useState([]);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [showLoginModal, setShowLoginModal] = useState(false);
const [showRegistrationModal, setShowRegistrationModal] = useState(false);

const [activeFoodTruck, setActiveFoodTruck] = useState([]);

  useEffect(() => {
    // Fetch user's cart items from the server session
    axios
      .get('/api/cart')
      .then((response) => {
        setCartItems(response.data.cartItems);
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
      });
  }, []);

  useEffect(() => {
    // Update user's cart items in the server session whenever it changes
    axios
      .put('/api/cart', { cartItems })
      .then(() => {
        console.log('Cart items updated successfully.');
      })
      .catch((error) => {
        console.error('Error updating cart items:', error);
      });
  }, [cartItems]);

  const handleAddToCart = (menuItem, quantity) => {
  if (!isLoggedIn) {
    setShowLoginModal(true);
  } else {
    if (cartItems) {
      const existingItem = cartItems.find(
        (item) => item.item_id === menuItem.item_id && item.truckId === menuItem.truckId
      );

      if (existingItem) {
        const updatedCartItems = cartItems.map((item) => {
          if (item.item_id === menuItem.item_id && item.truckId === menuItem.truckId) {
            return { ...item, quantity: item.quantity + quantity };
          }
          return item;
        });
        setCartItems(updatedCartItems);
      } else {
        const newCartItem = { ...menuItem, quantity };
        setCartItems((prevCartItems) => [...prevCartItems, newCartItem]);
      }
    } else {
      const newCartItem = { ...menuItem, quantity };
      setCartItems([newCartItem]);
    }
  }
};

  
  
  
  
  
  

  const handleRemoveFromCart = (itemToRemove) => {
    const existingItem = cartItems.find(
      (item) => item.item_id === itemToRemove.item_id && item.truckId === itemToRemove.truckId
    );

    if (existingItem && existingItem.quantity > 1) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.item_id === existingItem.item_id && item.truckId === existingItem.truckId ? itemToRemove : item
        )
      );
    } else {
      setCartItems((prevItems) =>
        prevItems.filter(
          (item) => item.item_id !== itemToRemove.item_id || item.truckId !== itemToRemove.truckId
        )
      );
    }
  };

  useEffect(() => {
    const fetchTrucks = async () => {
      const trucksData = await ApiCalls.getTrucks();
      setTrucks(trucksData);
    };

    fetchTrucks();
  }, []);

  return (
    <ModalContext.Provider
      value={{
        showRegistrationModal,
        setShowRegistrationModal,
        showLoginModal,
        setShowLoginModal,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      <Router>
        <div className='App'>
          <Navbar
            cartItems={cartItems}
            onRemoveFromCart={handleRemoveFromCart}
            onAddToCart={handleAddToCart}
            isLoggedIn={isLoggedIn}
            setShowLoginModal={setShowLoginModal}
            setShowRegistrationModal={setShowRegistrationModal}
          />
          <Routes>
            <Route path='/' element={<FoodTruckList foodTrucks={trucks} setActiveFoodTruck={setActiveFoodTruck} />} />
            <Route
              path='/:truckId/menu'
              element={
                <FoodTruckMenuWrapper
                  trucks={trucks}
                  handleAddToCart={handleAddToCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  isLoggedIn={isLoggedIn}
                  setShowLoginModal={setShowLoginModal}
                  setShowRegistrationModal={setShowRegistrationModal}
                />
              }
            />
            <Route path='/cart' element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path='/orders' element={<Orders />} />
          </Routes>
        </div>
      </Router>
    </ModalContext.Provider>
  );
}

export default App;

