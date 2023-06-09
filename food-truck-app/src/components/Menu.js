import React, { useState, useEffect } from "react";
import ApiCallsOwner from "../ApiCallsOwner";
import ReactCardFlip from 'react-card-flip';
import { Button } from 'react-bootstrap';
import './Menu.scss';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userTruckId, setUserTruckId] = useState(null);

  useEffect(() => {
    const fetchUserTruckId = async () => {
      try {
        const truckData = await ApiCallsOwner.getTruckData();
        const truckId = truckData ? truckData.truck_id : null;
        setUserTruckId(truckId);
      } catch (error) {
        console.error('Error fetching user truck:', error);
      }
    };

    fetchUserTruckId();
  }, []);

  useEffect(() => {
    const fetchMenuItems = async () => {
      console.log("usertruckid in fetchorder", userTruckId);

      if(userTruckId) {
        try {
          const menuItems = await ApiCallsOwner.getMenuItems(userTruckId);
          const menuItemsWithFlippedState = menuItems.map(item => ({ ...item, isFlipped: false }));
        setMenuItems(menuItemsWithFlippedState);
        } catch (error) {
          console.error("Error fetching menu items:", error);
        }
      }
    };

    fetchMenuItems();
  }, [userTruckId]);

  const handleEditClick = (index) => {
    setMenuItems((prevMenuItems) => {
      const updatedMenuItems = [...prevMenuItems];
      updatedMenuItems[index]= { ...updatedMenuItems[index], isFlipped: true };
      return updatedMenuItems;
    });
  };

  const handleSaveClick = async (index) => {
    const menuItemToUpdate = menuItems[index];
    console.log("menuitemtoupdate", menuItemToUpdate);
    const updatedData = {
      item_name: menuItemToUpdate.item_name,
      description: menuItemToUpdate.description,
      price: menuItemToUpdate.price,
      allergens: menuItemToUpdate.allergens,
      calories: menuItemToUpdate.calories,
      halal: menuItemToUpdate.halal,
      picture: menuItemToUpdate.picture,
      active: menuItemToUpdate.active,
      isFlipped: false
    };
    
    try {
      await ApiCallsOwner.updateMenuItem(menuItemToUpdate.item_id, updatedData);
      console.log("calories updateddata", updatedData);
      const updatedMenuItem = menuItems[index];
      console.log("updatedmenuitem singular", updatedMenuItem);
  
      setMenuItems((prevMenuItems) => {
        const updatedMenuItems = [...prevMenuItems];
        updatedMenuItems[index] = updatedMenuItem;
        updatedMenuItems[index] = { ...updatedMenuItem, isFlipped: false };
        console.log("updatedmenuitems", updatedMenuItems)
        return updatedMenuItems;
      });
    } catch (error) {
      console.error('Error updating menu item', error);
    }
  };

  const handleInputChange = (index, propertyName, value) => {
    const updatedMenuItems = [...menuItems];
    updatedMenuItems[index][propertyName] = value;
    setMenuItems(updatedMenuItems);
  };

  const firstCharCapital = function (string) {
    const stringTwo = string.charAt(0).toUpperCase() + string.slice(1);
    return stringTwo;
  }

  return (
    <div className="menu-container">
      <h1>Menu</h1>
      {menuItems.map((menuItem, index) => (
        <ReactCardFlip
          key={index}
          isFlipped={menuItem.isFlipped}
          flipDirection="vertical"
        >
          {/* Front Side */}
          <div className="front-side">
            <h3>{menuItem.item_name}</h3>
            <p>Description: {menuItem.description}</p>
            <p>Price: ${menuItem.price}</p>
            <div>
              <img src={menuItem.picture} alt="Image" />
            </div>
            <p>Allergens: {menuItem.allergens}</p>
            <p>Calories: {menuItem.calories}</p>
            <p>Halal: {firstCharCapital(menuItem.halal.toString())}</p>
            <p>Item Availability: {firstCharCapital(menuItem.active.toString())}</p>
            <Button variant="primary" onClick={() => handleEditClick(index)}>Edit</Button>
          </div>

          {/* Back Side */}
          <div className="back-side">
            <h3>Edit Item</h3>
              <form>
                <label>
                  Item Name: 
                  <input type="text" value={menuItem.item_name} onChange={(e) => handleInputChange(index, 'item_name', e.target.value)} />
                </label>
                <label>
                  Description: 
                  <input type="text" value={menuItem.description} onChange={(e) => handleInputChange(index, 'description', e.target.value)} />
                </label>
                <label>
                  Price: $ 
                  <input type="text" value={menuItem.price} onChange={(e) => handleInputChange(index, 'price', e.target.value)} />
                </label>
                <label>
                  Allergens: 
                  <input type="text" value={menuItem.allergens} onChange={(e) => handleInputChange(index, 'allergens', e.target.value)} />
                </label>
                <label>
                  Calories: 
                  <input type="text" value={menuItem.calories} onChange={(e) => handleInputChange(index, 'calories', e.target.value)} />
                </label>
                <label>
                  Picture URL:  
                  <input type="text" value={menuItem.picture} onChange={(e) => handleInputChange(index, 'picture', e.target.value)} />
                </label>
                <label>
                  Halal: 
                  <select value={menuItem.halal} onChange={(e) => handleInputChange(index, 'halal', e.target.value)}>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </label>
                <label>
                  Item Availability: 
                  <select value={menuItem.active} onChange={(e) => handleInputChange(index, 'active', e.target.value)}>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </label>
              </form>
              <Button variant="success" onClick={() => handleSaveClick(index)}>Save</Button>
          </div>
        </ReactCardFlip>
      ))}
    </div>
  );
};

export default Menu;