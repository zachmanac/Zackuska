import logo from './logo.svg';
import './App.scss';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import LandingScreen from './screens/LandingScreen';
import RegisterForm from './components/RegisterForm';
import ModalContextProvider from './contexts/ModalContext';
import AuthContextProvider from './contexts/AuthContext';
// import TruckMenuScreen from './screens/TruckMenuScreen';
// import CartScreen from './screens/CartScreen';
// import PaymentScreen from './screens/PaymentScreen';

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <ModalContextProvider>
        {/* <CartProvider> */}
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/" element={<LandingScreen />} />
            {/* <Route exact path="/" component={LandingScreen} />
            <Route path="/truck/:truckId/menu" component={TruckMenuScreen} />
            <Route path="/cart" component={CartScreen} />
            <Route path="/payment" component={PaymentScreen} /> */}
          </Routes>
        {/* </CartProvider> */}
        </ModalContextProvider>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
