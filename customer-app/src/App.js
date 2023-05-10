import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import FoodTruckList from './Components/FoodTruckList';
import FoodTruckMenu from './Components/FoodTruckMenu';
import Cart from './Components/Cart';
import './App.scss';
import * as api from './ApiCalls';

function App() {

  const [activeFoodTruck, setActiveFoodTruck] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [menu, setMenu] = useState([]);

  const handleAddToCart = (menuItem) => {
    setCartItems((prevCartItems) => [...prevCartItems, menuItem]);
  };

  const handleRemoveFromCart = (menuItem) => {
    console.log("HANDLEREMOVE MENUITEM", menuItem, " HANDLEREMOVE CARTITEMS", cartItems)
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== menuItem.id)
    );
  };

  api.getTrucks((trucks) => {
    // console.log(trucks);
    setTrucks(trucks);
  });

  api.getMenu((menu) => {
    // console.log(menu);
    setMenu(menu);
  })

  return (
    <div>
      <Navbar cartItems={cartItems} handleRemoveFromCart={handleRemoveFromCart} />
      {activeFoodTruck ? (
        <FoodTruckMenu
          foodTruck={activeFoodTruck}
          onAddToCart={handleAddToCart}
          menuItems={dummyMenuItems}
        />
      ) : (
        <FoodTruckList foodTrucks={dummyTrucks} setActiveFoodTruck={setActiveFoodTruck} />
      )}
    </div>
  );
}

export default App;