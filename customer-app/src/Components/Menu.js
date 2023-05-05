// import './styles/Menu.scss';
import React from 'react';

function Menu(props) {
  
  const { menu } = props; 

  const menuDisplay = menu.map(item => 
    <div key={item.id} className="menu-item">
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <p>${item.price}</p>
    </div>
  )

  return (
    <div className="menu">
      {menuDisplay}
    </div>
  );
}

export default Menu;