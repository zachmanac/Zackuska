import React from "react";
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
        {foodTrucks.map((truck) => (
          <div className="food-truck" li key={truck.owner_id} onClick={() => handleFoodTruckClick(truck)}>
            <h3 className="food-truck-orange">{truck.truck_name}</h3>
            <p>{truck.phone_number}</p>
            <img src={truck.picture} alt={truck.truck_name} />
            <p>Facebook: {truck.facebook}</p>
            <p>Instagram: {truck.instagram}</p>
            <p>Da cuisine: {truck.cuisine}</p>
            <MapGoogle />
          </div>
        ))}
      </div>
    </div>
  );

}

export default FoodTruckList;