import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './Components/Navbar';
import FoodTruckList from './Components/FoodTruckList';
import FoodTruckMenu from './Components/FoodTruckMenu';
import Cart from './Components/Cart';
import './App.css';

function App() {
  // const { isAuthenticated } = useAuth0();
  const [activeFoodTruck, setActiveFoodTruck] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (menuItem) => {
    setCartItems((prevCartItems) => [...prevCartItems, menuItem]);
  };

  const handleRemoveFromCart = (menuItem) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== menuItem.id)
    );
  };


  const dummyTrucks = [
    {
      owner_id: 2,
      truck_name: 'Street Food',
      phone_number: '1-812-864-7479',
      picture: 'http://reddit.com/sub/cars?str=se',
      facebook: 'facebook.com',
      instagram: 'instagram.com',
      cuisine: 'American'
    },
    {
      owner_id: 3,
      truck_name: 'Poutine and More',
      phone_number: '1-618-744-4962',
      picture: 'https://twitter.com/group/9?search=1&q=de',
      facebook: 'facebook.com',
      instagram: 'instagram.com',
      cuisine: 'Canadian'
    },
    {
      owner_id: 5,
      truck_name: 'Fish and chips',
      phone_number: '1-451-483-2576',
      picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSifkFT4-NrH3e0rHC0sui9RwQz69k3eflh1Q&usqp=CAU',
      facebook: 'facebook.com',
      instagram: 'instagram.com',
      cuisine: 'British'
    },
    {
      owner_id: 6,
      truck_name: 'The chiken and rice guys',
      phone_number: '(672) 468-4184',
      picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaEwXTOTXNL3P61eKRZgVzf33XHix8A7VWOg&usqp=CAU',
      facebook: 'facebook.com',
      instagram: 'instagram.uk',
      cuisine: 'Texan'
    },
    {
      owner_id: 7,
      truck_name: 'Tacos',
      phone_number: '(384) 435-3287',
      picture: 'https://instagram.com/one?ab=441&aad=2',
      facebook: 'facebook.com',
      instagram: 'instagram.com',
      cuisine: 'Mexican'
    }
  ];
  
  const dummyMenuItems = [
    {
      truck_id: 1,
      item_name: 'Butter Chicken',
      price: 13,
      calories: 129,
      allergens: 'peanut, celery',
      halal: false,
      description: 'An onion, a can of crushed tomatoes, garlic and ginger, and some added spices'
    },
    {
      truck_id: 2,
      item_name: 'Eggs Benedit',
      price: 23,
      calories: 768,
      allergens: 'gluten, oats',
      halal: true,
      description: 'It tastes rich, lemony buttery, and creamy all thanks to the Hollandaise sauce it is topped with'
    },
    {
      truck_id: 3,
      item_name: 'Earth and Sea',
      price: 10,
      calories: 272,
      allergens: 'crab, lobster',
      halal: false,
      description: 'Anchovy, bass, bluefish, carp, catfish, char, cod, flounder, haddock, halibut, herring, orange roughy, mahi-mahi, sardines, salmon, trout and tuna'
    },
    {
      truck_id: 4,
      item_name: 'Bean Soup',
      price: 12,
      calories: 266,
      allergens: 'seasame, soybeans',
      halal: false,
      description: 'A small amount of an acidic ingredient like lemon juice added at the end of cooking brightens flavors, especially in long-simmered bean soups or rich meat-based soups'
    },
    {
      truck_id: 5,
      item_name: 'Buen Taco',
      price: 10,
      calories: 32,
      allergens: 'mustard, egg',
      halal: false,
      description: `Tortilla (generally made of corn), followed by a stew, accompanied with chopped onion, cilantro, and lime, as well as some salsa, which varies in spiciness according to the diner's taste`
    },
    {
      truck_id: 1,
      item_name: 'Roasted Chicken',
      price: 13,
      calories: 129,
      allergens: 'peanut, celery',
      halal: false,
      description: 'Crispy, crackly skin, with most of the fat rendered out. Perfectly cooked, barely pink breast (155°F) Thoroughly roasted thigh and legs (165 to 175°F) As little effort as possible to get the above, so that it is simple enough to prepare even on a weeknight'
    },
    {
      truck_id: 2,
      item_name: 'Rice and Beans',
      price: 18,
      calories: 768,
      allergens: 'gluten, oats',
      halal: true,
      description: 'Category of dishes from many cultures around the world, whereby the staple foods of rice and beans are combined in some manner'
    },
    {
      truck_id: 3,
      item_name: 'Seafood',
      price: 23,
      calories: 272,
      allergens: 'crab, lobster',
      halal: false,
      description: 'Seafood comprises all bony fishes and the more primitive sharks, skates, rays, sawfish, sturgeons, and lampreys'
    },
    {
      truck_id: 4,
      item_name: 'Fried Rice',
      price: 19,
      calories: 266,
      allergens: 'sesame, soybeans',
      halal: false,
      description: 'The most important sauces to add are soy sauce, oyster sauce, and fish sauce in fried rice'
    },
    {
      truck_id: 5,
      item_name: 'Quesadillas',
      price: 14,
      calories: 32,
      allergens: 'mustard, egg',
      halal: false,
      description: `Grilled tortilla with melted cheese inside. It's the Mexican grilled cheese, if you will, and you can add additional fillings if you'd like`
    }
  ]

  return (
    <div>
      <Navbar />
      {/* <Navbar isAuthenticated={isAuthenticated} /> */}
      {activeFoodTruck ? (
        <FoodTruckMenu
          foodTruck={activeFoodTruck}
          onAddToCart={handleAddToCart}
          menuItems={dummyMenuItems}
        />
      ) : (
        <FoodTruckList foodTrucks={dummyTrucks} setActiveFoodTruck={setActiveFoodTruck} />
      )}
    </div>
  );
}

export default App;