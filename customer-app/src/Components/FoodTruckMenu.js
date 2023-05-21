import React, { useState, useEffect } from 'react';
import './FoodTruckMenu.scss';
import { Button } from 'react-bootstrap';
import ApiCalls from '../ApiCalls';
import MapGoogle from './MapGoogle';
import { ModalContext } from './ModalContext';
import { useContext } from 'react';



function FoodTruckMenu({ 
  onAddToCart, 
  onRemoveFromCart, 
  truckId, 
  trucks, 
  cartItems, 
  isLoggedIn, 
  setShowLoginModal 
}) {
  const [allergensOpenIndex, setAllergensOpenIndex] = useState(-1);
  const [menuItems, setMenuItems] = useState([]);
  const { setShowRegistrationModal } = useContext(ModalContext);



  const foodTruck = trucks.find((truck) => truck.truck_id === Number(truckId));

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

  const handleAddToCartClick = (menuItem) => {
    if (!isLoggedIn) {
      setShowRegistrationModal(true); // Show the registration modal
    } else {
      onAddToCart(menuItem, 1); // Assuming a quantity of 1, you can modify this as per your requirement
    }

  };
  const handleRemoveFromCartClick = (menuItem) => {
    const existingItem = cartItems.find((item) => item.item_id === menuItem.item_id);
    
    if (existingItem && existingItem.quantity > 1) {
      // If item quantity is more than 1, decrease the quantity
      const updatedCartItem = { ...existingItem, quantity: existingItem.quantity - 1 };
      onRemoveFromCart(updatedCartItem);
    } else {
      // If item quantity is 1 or item does not exist in the cart, remove it
      onRemoveFromCart(menuItem);
    }
  };
  

  

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
        <MapGoogle address={foodTruck.address} />
      </div>
      <div className="menu-right-side">
        {menuItems.map((menuItem, index) => {
          const cartItem = cartItems.find((item) => item.item_id === menuItem.item_id);
          const quantityInCart = cartItem ? cartItem.quantity : 0;

          return (
            <div key={index} className="menu-item-individual">
              <div className="menu-item-content">
                <img src={menuItem.picture} alt="Item Image" className="menu-item-image" />
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
                            {menuItem.allergens.split(', ').map((allergen, index) => (
                              <div key={index}>{allergen}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="menu-price-and-cart">
                        {quantityInCart > 0 && (
                    <Button 
                      variant="danger"
                      onClick={() => handleRemoveFromCartClick(menuItem)}
                    >
                      Remove -1
                    </Button>
                  )}
                    <p>${menuItem.price}</p>
                      <div className="cart-button-container">
                        <span>{quantityInCart} in Cart</span>
                        <Button 
                          variant="primary" 
                          onClick={() => handleAddToCartClick(menuItem)}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                  <p className={`menu-item-description ${allergensOpenIndex === index ? 'allergens-open' : ''}`}>{menuItem.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FoodTruckMenu;

