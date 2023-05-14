import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Navbar from './Components/Navbar';
import FoodTruckList from './Components/FoodTruckList';
import FoodTruckMenu from './Components/FoodTruckMenu';
import Cart from './Components/Cart';
import './App.scss';
import ApiCalls from './ApiCalls';
import { ModalContext } from './Components//ModalContext';


function FoodTruckMenuWrapper({ trucks, onAddToCart, cartItems, isLoggedIn }) {
  const { truckId } = useParams();

  return (
    <FoodTruckMenu
    truckId={truckId}
    trucks={trucks}
    onAddToCart={onAddToCart}
    cartItems={cartItems}
    isLoggedIn={isLoggedIn}
    />
  );
}

function App() {
  const [activeFoodTruck, setActiveFoodTruck] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  // Retrieve cartItems from session storage 
  useEffect(() => {
    const storedCartItems = sessionStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // Store cartItems in session storage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (menuItem, quantity) => {
    if (!isLoggedIn) {
      // Prompt the user to log in or register
      setShowLoginModal(true);
    } else {
      // Add item to cart
      const existingItem = storedCartItems.find((item) => item.item_id === menuItem.item_id);
  
      if (existingItem) {
        // Item already exists in cart, update the quantity
        const updatedCartItems = storedCartItems.map((item) => {
          if (item.item_id === menuItem.item_id) {
            return { ...item, quantity: item.quantity + quantity };
          }
          return item;
        });
        setStoredCartItems(updatedCartItems);
      } else {
        // Item is new, add it to the cart with the specified quantity
        const newCartItem = { ...menuItem, quantity };
        setStoredCartItems((prevCartItems) => [...prevCartItems, newCartItem]);
      }
    }
  };
  
  

  const handleRemoveFromCart = (menuItem) => {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item.item_id !== menuItem.item_id));
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
          handleRemoveFromCart={handleRemoveFromCart}
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
              onAddToCart={handleAddToCart}
              cartItems={cartItems}
              isLoggedIn={isLoggedIn}
              setShowLoginModal={setShowLoginModal}
              setShowRegistrationModal={setShowRegistrationModal}
              />
            }
          />
          <Route path="/cart" element={<Cart cartItems={storedCartItems} handleRemoveFromCart={handleRemoveFromCart} />} />

        </Routes>
      </div>
    </Router>
    </ModalContext.Provider>
  );
}

export default App;
