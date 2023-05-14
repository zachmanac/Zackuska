import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Navbar from './Components/Navbar';
import FoodTruckList from './Components/FoodTruckList';
import FoodTruckMenu from './Components/FoodTruckMenu';
import Cart from './Components/Cart';
import './App.scss';
import ApiCalls from './ApiCalls';


function FoodTruckMenuWrapper({ trucks, onAddToCart }) {
  const { truckId } = useParams();

  return (
      <FoodTruckMenu
        truckId={truckId}
        trucks={trucks}
        onAddToCart={onAddToCart}
      />
  );
}

function App() {
  const [activeFoodTruck, setActiveFoodTruck] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [menu, setMenu] = useState([]);


  const handleAddToCart = (menuItem) => {
    setCartItems((prevCartItems) => [...prevCartItems, menuItem]);
  };

  const handleRemoveFromCart = (menuItem) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.item_id !== menuItem.item_id)
    );
  };

  // Fetch trucks only once when component mounts
  useEffect(() => {
    const fetchTrucks = async () => {
      const trucksData = await ApiCalls.getTrucks();
      setTrucks(trucksData);
    };

    fetchTrucks();
  }, []);

  // Fetch menu for the active truck when activeFoodTruck changes
  useEffect(() => {
    const fetchMenu = async () => {
      if (activeFoodTruck) {
        const menuData = await ApiCalls.getMenu(activeFoodTruck);
        setMenu(menuData);
      }
    };

    fetchMenu();
  }, [activeFoodTruck]);

  return (
    <Router>
        <div>
          <Navbar cartItems={cartItems} handleRemoveFromCart={handleRemoveFromCart} />
          <Routes>
            <Route path="/" element={<FoodTruckList foodTrucks={trucks} setActiveFoodTruck={setActiveFoodTruck} />} />
            <Route
              path="/:truckId/menu"
              element={
                <FoodTruckMenuWrapper
                  trucks={trucks}
                  onAddToCart={handleAddToCart}
                />
              }
            />
            <Route path="/cart" element={<Cart cartItems={cartItems} handleRemoveFromCart={handleRemoveFromCart} />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
