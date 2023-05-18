import React, { useState, useEffect } from "react";
import ApiCallsOwner from "../ApiCallsOwner";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const truckId = 1;
        const menuItems = await ApiCallsOwner.getMenuItems(truckId);
        // commented coded below should work if loggedinuser is an owner
        // const truckData = await ApiCallsOwner.getTruckData();
        // const menuItems = await ApiCallsOwner.getMenuItems(truckData.truck_id);
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
      {menuItems.map((menuItem, index) => (
        <div key={index} className="menu-item">
          <h3>Item: {menuItem.item_name}</h3>
          <p>Description: {menuItem.description}</p>
          <p>Price: ${menuItem.price}</p>
          <img src={menuItem.picture} alt="Image" />
          <p>Allergens: {menuItem.allergens}</p>
          <p>calories: {menuItem.calories}</p>
          <p>Halal: {menuItem.halal.toString()}</p>
          <p>Status: {menuItem.active.toString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Menu;