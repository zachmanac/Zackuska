import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import FoodTruckList from './Components/FoodTruckList';
import FoodTruckMenu from './Components/FoodTruckMenu';
import Cart from './Components/Cart';
import './App.scss';
import ApiCalls from './ApiCalls';

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

  useEffect(() => {
    ApiCalls.getTrucks((trucks) => {
      setTrucks(trucks);
    });

    const truckId = activeFoodTruck ? activeFoodTruck.truck_id : null;

    if (truckId) {
      ApiCalls.getMenu(truckId, (menu) => {
        setMenu(menu);
      })
    }
  }, [activeFoodTruck]);

  return (
    <Router>
      <div>
        <Navbar cartItems={cartItems} handleRemoveFromCart={handleRemoveFromCart} />
        <Routes>
          <Route exact path="/" element=
            {activeFoodTruck ? (
              <FoodTruckMenu
                foodTruck={activeFoodTruck}
                onAddToCart={handleAddToCart}
                menuItems={menu}
              />
            ) : (
              <FoodTruckList foodTrucks={trucks} setActiveFoodTruck={setActiveFoodTruck} />
            )}
          />
          <Route path="/cart" element={
            <Cart cartItems={cartItems} handleRemoveFromCart={handleRemoveFromCart} />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;