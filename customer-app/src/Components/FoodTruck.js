import React from 'react';
import Menu from './Menu';
// import './styles/FoodTruck.scss';

function FoodTruck(props) {
  
  const { foodTruck, menuItems, useNavigate } = props;

  const navigate = useNavigate();
  
  const handleClick = function() {
    navigate(`/foodTruck/${foodTruck.id}`);
  }

  return (
    <div>
      <div className='food-truck' onClick={handleClick}>
        <h1>{foodTruck.name}</h1>
        <p>{foodTruck.description}</p>
        {/* location thumbnail */}
        <p>{foodTruck.address}</p>
      </div>
      <Menu menu={menuItems} />
    </div>
  );
}

export default FoodTruck;