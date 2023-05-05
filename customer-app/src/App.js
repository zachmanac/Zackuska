import './App.css';

import React, { useState, useEffect } from 'react'
import FoodTruck from './Components/FoodTruck';
function App() {
  //
  //data fetching here for foodTruck and menuItems
  const foodTrucks = []
  const menuItems = []
  //

  return (
    <div className="App">
      <header className="App-header">
        <p>
          The main food truck page
        </p>
      </header>

      <div>
        {foodTrucks.map(foodTruck => {
          const specificMenu = menuItems.filter(item => item.foodTruckId === foodTruck.id);
          
          return <FoodTruck key={foodTruck.id} foodTruck={foodTruck} menuItems={specificMenu} />
        })}
      </div>

    </div>
  );
}

export default App;