import React, { useState } from "react";
import './FoodTruckMenu.scss';
import { Button } from 'react-bootstrap';

function FoodTruckMenu(props) {
  const { menuItems, foodTruck, handleAddToCart } = props;
  const [allergensOpenIndex, setAllergensOpenIndex] = useState(-1);

  const truckMenu = menuItems.filter(
    (menuItem) => menuItem.truck_id === foodTruck.owner_id
  );

  console.log("menuitems", menuItems)
  console.log("foodtruck", foodTruck);

  return (
    <div className="food-truck-menu">
      <div className="menu-left-side">
        <h1>{foodTruck.truck_name}</h1>
        <h2>Food truck description</h2>
        <img src={foodTruck.picture} alt={foodTruck.truck_name} />
        <p>Reviews</p>
        <p>Hours of operation</p>
      </div>
      <div className="menu-right-side">
        {truckMenu.map((menuItem, index) => (
          <div key={menuItem.id} className="menu-item-individual">
            <div className="menu-item-title-price">
              <div>
                <h3>{menuItem.item_name}</h3>
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
              <div className="menu-price-and-cart">
                <p>${menuItem.price}</p>
                <Button 
                  variant="primary" 
                  onClick={() => handleAddToCart(menuItem)}
                  >
                    Add to Cart
                </Button>
              </div>
            </div>
            <p className="menu-item-description">{menuItem.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

}

export default FoodTruckMenu;