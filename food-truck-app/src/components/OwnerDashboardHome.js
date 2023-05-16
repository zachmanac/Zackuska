import React from "react";
import { Link } from "react-router-dom";
import './OwnerDashboardHome.scss';

const OwnerDashboardHome = () => {
  return (
    <div className="owner-dashboard-div">
      <h1 className="title">Owner Dashboard Home Should be navbar here with login button and stuff</h1>
      <div className="nav-links-container">
        <Link to="/orders" className="nav-link">Current Orders</Link>
        <Link to="/order-history" className="nav-link">Order History</Link>
        <Link to="/menu" className="nav-link">Menu</Link>
        <Link to="/truck-info" className="nav-link">Truck Info</Link>
      </div>
    </div>
  )
}

export default OwnerDashboardHome;