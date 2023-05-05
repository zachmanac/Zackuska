import './App.css';

import React, { useState, useEffect } from 'react'
import FoodTruck from './Components/FoodTruck';
import { useNavigate, BrowserRouter, Route, Switch } from "react-router-dom";
import TrucksList from './Components/TrucksList';

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
        <TrucksList />
      </div>

    </div>
  );
}

export default App;