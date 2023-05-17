import React, { useState, useEffect } from "react";
import ApiCallsOwner from "../ApiCallsOwner";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const truckData = await ApiCallsOwner.getTruckData();
        const menuItems = await ApiCallsOwner.getMenuItems(truckData.truck_id);
        setMenuItems(menuItems);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div>
      <h1>Menu Page</h1>
      {menuItems.map((menuItem) => (
        <div key={menuItem.id} className="menu-item">
          <h3>Item: {menuItem.name}</h3>
          <p>Description: {menuItem.description}</p>
          <p>Price: ${menuItem.price}</p>
          <p>Image: {menuItem.picture}</p>
          <p>Allergens: {menuItem.allergens}</p>
          <p>calories: {menuItem.calories}</p>
          <p>Halal: {menuItem.halal}</p>
          <p>Status: {menuItem.active}</p>
        </div>
      ))}
    </div>
  );
};

export default Menu;