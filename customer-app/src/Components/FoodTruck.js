import React from 'react';
import Menu from './Components/Menu';
// import './styles/FoodTruck.scss';
import { useNavigate } from "react-router-dom";


function FoodTruck(props) {
  
  const { foodTruck, menuItems } = props;

  const navigate = useNavigate();
  
  const handleClick = function() {
    navigate(`/foodTruck/${foodTruck.id}`);
  }

  return (
    <div>
      <div className='food-truck' onClick={handleClick}>
        <h1>{foodTruck.name}</h1>
        <p>{foodTruck.description}</p>
      </div>
      <Menu menu={menuItems} />
    </div>
  );
}

export default FoodTruck;