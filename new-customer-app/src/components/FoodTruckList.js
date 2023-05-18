import React from 'react';
import { Link } from 'react-router-dom';
import './FoodTruckList.scss';

const FoodTruckList = (props) => {
  const { foodTrucks, setActiveFoodTruck } = props;

  const handleFoodTruckClick = (foodTruck) => {
    setActiveFoodTruck(foodTruck);
  };

  return (
    <div className="food-truck-list-container">
      {foodTrucks &&
        foodTrucks.map((truck, index) => (
          <div className="food-truck" key={index}>
            <Link
              to={`/${truck.truck_id}/menu`}
              onClick={() => handleFoodTruckClick(truck)}
              className="food-truck-link"
            >
              <h3 className="food-truck-name">{truck.truck_name}</h3>
              <p>{truck.phone_number}</p>
              <img src={truck.picture} alt={truck.truck_name} className="food-truck-image" />
              <p>Facebook: {truck.facebook}</p>
              <p>Instagram: {truck.instagram}</p>
              <p>Cuisine: {truck.cuisine}</p>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default FoodTruckList;
