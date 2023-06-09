import './App.scss';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OwnerDashboardHome from "./components/OwnerDashboardHome";
import Menu from "./components/Menu";
import Orders from "./components/Orders";
import OrderHistory from "./components/OrderHistory";
import TruckInfo from "./components/TruckInfo";
import { ModalContext } from "./components/ModalContext";
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ApiCallsOwner from './ApiCallsOwner';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [userTruck, setUserTruck] = useState();
  
  // const userId = window.sessionStorage.getItem('user_id');
  // const foodTruckId = window.sessionStorage.getItem('foodtruck_id');

  useEffect(() => {
    const fetchUserTruck = async () => {
      const trucksData = await ApiCallsOwner.getTruckData();
      console.log("trucksdata", trucksData);
      setUserTruck(trucksData);
    };

    fetchUserTruck();
  }, []);

  return (
    <ModalContext.Provider value={{ showRegistrationModal, setShowRegistrationModal, showLoginModal, setShowLoginModal, isLoggedIn, setIsLoggedIn }}>
    <Router>
      <div className='App'>
        <Navbar
          isLoggedIn={isLoggedIn}
          setShowLoginModal={setShowLoginModal}
          setShowRegistrationModal={setShowRegistrationModal}
        />
        <Routes>
          <Route path="/" element={<OwnerDashboardHome />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/truck-info" element={<TruckInfo />} />
        </Routes>
      </div>
    </Router>
    </ModalContext.Provider>
  );
}

export default App;
