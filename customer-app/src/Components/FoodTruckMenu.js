import React, { useState, useEffect } from "react";
import './FoodTruckMenu.scss';
import { Button } from 'react-bootstrap';
import ApiCalls from "../ApiCalls";
import MapGoogle from "./MapGoogle";


function FoodTruckMenu({ onAddToCart, truckId, trucks }) {
  const [allergensOpenIndex, setAllergensOpenIndex] = useState(-1);
  const [menuItems, setMenuItems] = useState([]);
  const foodTruck = trucks.find(truck => truck.truck_id === Number(truckId));

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const fetchedMenu = await ApiCalls.getMenu2(truckId);
        console.log(fetchedMenu);
        setMenuItems(fetchedMenu);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMenu();
  }, [truckId]);

  if (!foodTruck) {
    return <div>Loading...</div>;
  }


  return (
    <div className="food-truck-menu">
      <div className="menu-left-side">
        <img src={foodTruck.picture} alt={foodTruck.truck_name} />
        <h1>{foodTruck.truck_name}</h1>
        <p>{foodTruck.phone_number}</p>
        <p>Facebook: {foodTruck.facebook}</p>
        <p>Instagram: {foodTruck.instagram}</p>
        <p>Da cuisine: {foodTruck.cuisine}</p>
        <h2>Food truck description</h2>
        <p>Reviews</p>
        <div className="hours-container">
          <p className="hours-title">Hours of operation</p>
          <p className="hours">Start time: {foodTruck.start_time}</p>
          <p className="hours end">End time: {foodTruck.end_time}</p>
        </div>
        < MapGoogle address={foodTruck.address} />
      </div>
      <div className="menu-right-side">
        {menuItems.map((menuItem, index) => (
          <div key={index} className="menu-item-individual">
            <div className="menu-item-content">
              <img src={menuItem.image} alt="Item Image" className="menu-item-image" />
              <div className="menu-item-details">
                <div className="menu-item-title-price">
                  <div>
                    <h3>{menuItem.item_name}</h3>
                    <div className="menu-calories-and-allergens">
                      <p>{menuItem.calories} Calories</p>
                      <Button
                        variant="primary"
                        onClick={() =>
                          setAllergensOpenIndex(allergensOpenIndex === index ? -1 : index)
                        }
                      >
                        Allergens
                      </Button>
                      {allergensOpenIndex === index && (
                        <div className="menu-item-allergens">
                          {menuItem.allergens.split(", ").map((allergen, index) => (
                            <div key={index}>{allergen}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="menu-price-and-cart">
                    <p>${menuItem.price}</p>
                    <Button 
                      variant="primary" 
                      onClick={() => onAddToCart(menuItem)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
                <p className={`menu-item-description ${allergensOpenIndex === index ? 'allergens-open' : ''}`}>{menuItem.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

}

export default FoodTruckMenu;