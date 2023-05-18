import React from "react";
import { Link } from 'react-router-dom';
import './LandingScreen.scss';

function LandingScreen() {
  return (
    <div className="landing-screen-container">
      <h1>Welcome to Our App</h1>
      <p>Discover a world of delicious food trucks near you!</p>
      <Link to="/food-trucks" className="explore-button">Explore Food Trucks</Link>
    </div>
  );
}

export default LandingScreen;
