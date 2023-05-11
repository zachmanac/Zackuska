import React from "react";
import { Link } from 'react-router-dom';
import './FoodTruckList.scss';
import MapGoogle from "./MapGoogle";

function FoodTruckList(props) {
  const { foodTrucks, setActiveFoodTruck } = props;


  const handleFoodTruckClick = (foodTruck) => {
    setActiveFoodTruck(foodTruck);

  };

  return (
    <div className="food-trucks-container">
      <div className="food-trucks-wrapper">
        {foodTrucks && foodTrucks.map((truck) => (
          <Link to={`/${truck.truck_id}/menu`} key={truck.owner_id} onClick={() => handleFoodTruckClick(truck)}>
            <div className="food-truck">
              <h3 className="food-truck-orange">{truck.truck_name}</h3>
              <p>{truck.phone_number}</p>
              <img src={truck.picture} alt={truck.truck_name} />
              <p>Facebook: {truck.facebook}</p>
              <p>Instagram: {truck.instagram}</p>
              <p>Da cuisine: {truck.cuisine}</p>
              <MapGoogle />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

}

export default FoodTruckList;