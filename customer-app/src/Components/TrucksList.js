import React from 'react';

const trucks = [
    {
      "id": 1,
      "name": "Taco Truck",
      "description": "Authentic Mexican tacos on the go.",
      "image": "https://example.com/taco-truck-image.jpg",
      "location": {
        "latitude": 51.0486,
        "longitude": -114.0708
      },
      "cuisine": "Mexican",
      "rating": 4.5,
      "menu": [
        {
          "id": 1,
          "name": "Taco al Pastor",
          "description": "Marinated pork, pineapple, onion, cilantro",
          "price": 5.99,
          "rating": 4.8,
          "calories": 300,
          "allergens": [
            "gluten",
            "dairy"
          ]
        },
        {
          "id": 2,
          "name": "Taco de Pollo",
          "description": "Grilled chicken, avocado, tomato, onion",
          "price": 6.99,
          "rating": 4.6,
          "calories": 350,
          "allergens": [
            "dairy"
          ]
        },
        {
          "id": 3,
          "name": "Taco de Pescado",
          "description": "Battered fish, slaw, chipotle mayo",
          "price": 7.99,
          "rating": 4.4,
          "calories": 400,
          "allergens": [
            "gluten",
            "dairy"
          ]
        }
      ]
    },
    {
      "id": 2,
      "name": "Burger Bus",
      "description": "Gourmet burgers made fresh to order.",
      "image": "https://example.com/burger-bus-image.jpg",
      "location": {
        "latitude": 51.0453,
        "longitude": -114.0581
      },
      "cuisine": "American",
      "rating": 4.2,
      "menu": [
        {
          "id": 4,
          "name": "Classic Burger",
          "description": "Beef patty, lettuce, tomato, onion, pickles",
          "price": 8.99,
          "rating": 4.3,
          "calories": 600,
          "allergens": [
            "gluten",
            "dairy"
          ]
        },
        {
          "id": 5,
          "name": "Bacon Cheeseburger",
          "description": "Beef patty, bacon, cheddar cheese, lettuce, tomato",
          "price": 9.99,
          "rating": 4.5,
          "calories": 700,
          "allergens": [
            "gluten",
            "dairy"
          ]
        },
        {
          "id": 6,
          "name": "Veggie Burger",
          "description": "Veggie patty, avocado, sprouts, tomato",
          "price": 8.99,
          "rating": 4.1,
          "calories": 500,
          "allergens": [
            "gluten"
          ]
        }
      ]
    }
];

const userLocation = { latitude: 49.2827, longitude: -123.1207 };

const TrucksList = () => {
  const sortedTrucks = trucks.sort((a, b) => {
    const aDistance = Math.sqrt((userLocation.latitude - a.location.latitude) ** 2 + (userLocation.longitude - a.location.longitude) ** 2);
    const bDistance = Math.sqrt((userLocation.latitude - b.location.latitude) ** 2 + (userLocation.longitude - b.location.longitude) ** 2);
    return aDistance - bDistance;
  });

  return (
    <div>
        {sortedTrucks.map((truck) => (
        <div key={truck.id}>
          <a href={`/trucks/${truck.id}`}>
            <h2>{truck.name}</h2>
            <p>Distance: {Math.round(Math.sqrt((userLocation.latitude - truck.location.latitude) ** 2 + (userLocation.longitude - truck.location.longitude) ** 2) * 100) / 100} km</p>
            <img src={truck.image} alt={`${truck.name} thumbnail`} />
            <p><a href={`/trucks/${truck.id}`}>Menu</a></p>
            <p><a href={`/trucks/${truck.id}`}>Rating: {truck.rating}</a></p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default TrucksList;