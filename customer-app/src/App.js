import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Navbar from './Components/Navbar';
import FoodTruckList from './Components/FoodTruckList';
import FoodTruckMenu from './Components/FoodTruckMenu';
import Cart from './Components/Cart';
import './App.scss';
import ApiCalls from './ApiCalls';
import { ModalContext } from './Components//ModalContext';


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

const [activeFoodTruck, setActiveFoodTruck] = useState(null);

useEffect(() => {
  window.localStorage.setItem(`cartItems-${userId}`, JSON.stringify(cartItems));
}, [cartItems, userId]);

  

  // Store cartItems in local storage whenever it changes
  useEffect(() => {
    window.localStorage.setItem(`cartItems-${userId}`, JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (menuItem, quantity) => {
    if (!isLoggedIn) {
      // Prompt the user to log in or register
      setShowLoginModal(true);
    } else {
      // Add item to cart
      const existingItem = cartItems.find((item) => item.item_id === menuItem.item_id);
  
      if (existingItem) {
        // Item already exists in cart, update the quantity
        const updatedCartItems = cartItems.map((item) => {
          if (item.item_id === menuItem.item_id) {
            return { ...item, quantity: item.quantity + quantity };
          }
          return item;
        });
        setCartItems(updatedCartItems);
      } else {
        // Item is new, add it to the cart with the specified quantity
        const newCartItem = { ...menuItem, quantity };
        setCartItems((prevCartItems) => [...prevCartItems, newCartItem]);
      }
    }
  };
  
  

  const handleRemoveFromCart = (itemToRemove) => {
    const existingItem = cartItems.find(item => item.item_id === itemToRemove.item_id);
  
    if (existingItem && existingItem.quantity > 1) {
      // Replace the item with the updated one
      setCartItems(prevItems => prevItems.map(item => item.item_id === existingItem.item_id ? itemToRemove : item));
    } else {
      // Remove the item completely from the cart
      setCartItems(prevItems => prevItems.filter(item => item.item_id !== itemToRemove.item_id));
    }
  };
  

  // Fetch trucks only once when component mounts
  useEffect(() => {
    const fetchTrucks = async () => {
      const trucksData = await ApiCalls.getTrucks();
      setTrucks(trucksData);
    };

    fetchTrucks();
  }, []);

  return (
    <ModalContext.Provider value={{ showRegistrationModal, setShowRegistrationModal, showLoginModal, setShowLoginModal, isLoggedIn, setIsLoggedIn }}>
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
          <Route path="/" element={<FoodTruckList foodTrucks={trucks} setActiveFoodTruck={setActiveFoodTruck} />} />
          <Route
            path="/:truckId/menu"
            element={
              <FoodTruckMenuWrapper
              trucks={trucks}
              handleAddToCart={handleAddToCart}
              handleRemoveFromCart={handleRemoveFromCart}
              cartItems={cartItems}
              isLoggedIn={isLoggedIn}
              setShowLoginModal={setShowLoginModal}
              setShowRegistrationModal={setShowRegistrationModal}
              />
            }
          />
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems}  />} />

        </Routes>
      </div>
    </Router>
    </ModalContext.Provider>
  );
}

export default App;
