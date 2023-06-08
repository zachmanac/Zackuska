Seed Dummy Data:

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const seed = async () => {
  const cities = [
    {
      name: 'Calgary',
      trucks: [
        {
          name: 'Taco Truck',
          description: 'Authentic Mexican tacos on the go.',
          location: {
            latitude: 51.0486,
            longitude: -114.0708,
          },
          cuisine: 'Mexican',
          rating: 4.5,
          menu: [
            { name: 'Taco al Pastor', description: 'Marinated pork, pineapple, onion, cilantro', price: 5.99, rating: 4.8, calories: 300, allergens: ['gluten', 'dairy'] },
            { name: 'Taco de Pollo', description: 'Grilled chicken, avocado, tomato, onion', price: 6.99, rating: 4.6, calories: 350, allergens: ['dairy'] },
            { name: 'Taco de Pescado', description: 'Battered fish, slaw, chipotle mayo', price: 7.99, rating: 4.4, calories: 400, allergens: ['gluten', 'dairy'] },
          ],
        },
        {
          name: 'Burger Bus',
          description: 'Gourmet burgers made fresh to order.',
          location: {
            latitude: 51.0453,
            longitude: -114.0581,
          },
          cuisine: 'American',
          rating: 4.2,
          menu: [
            { name: 'Classic Burger', description: 'Beef patty, lettuce, tomato, onion, pickles', price: 8.99, rating: 4.3, calories: 600, allergens: ['gluten', 'dairy'] },
            { name: 'Bacon Cheeseburger', description: 'Beef patty, bacon, cheddar cheese, lettuce, tomato', price: 9.99, rating: 4.5, calories: 700, allergens: ['gluten', 'dairy'] },
            { name: 'Veggie Burger', description: 'Veggie patty, avocado, sprouts, tomato', price: 8.99, rating: 4.1, calories: 500, allergens: ['gluten'] },
          ],
        },
        {
          name: 'Pizza Wagon',
          description: 'Freshly baked pizzas with your choice of toppings.',
          location: {
            latitude: 51.0498,
            longitude: -114.0777,
          },
          cuisine: 'Italian',
          rating: 4.0,
          menu: [
            { name: 'Margherita Pizza', description: 'Tomato sauce, mozzarella cheese, basil', price: 10.99, rating: 4.2, calories: 800, allergens: ['gluten', 'dairy'] },
            { name: 'Pepperoni Pizza', description: 'Tomato sauce, mozzarella cheese, pepperoni', price: 11.99, rating: 4.3, calories: 900, allergens: ['gluten', 'dairy'] },
            { name: 'Veggie Pizza', description: 'Tomato sauce, mozzarella cheese, mushrooms, onions, peppers', price: 12.99, rating: 4.1, calories: 850, allergens: ['gluten', 'dairy'] },
          ],
        },
        {
          name: 'Sushi Stop',
          description: 'Fresh sushi rolls made to order.',
          location: {
            latitude: 51.0489,
            longitude: -114.0595,
          },
          cuisine: 'Japanese',
          rating: 4.1,
          menu: [
            { name: 'California Roll', description: 'Crab, avocado, cucumber', price: 6.99, rating: 4.2, calories: 400, allergens: ['shellfish', 'gluten'] },
            { name: 'Spicy Tuna Roll', description: 'Tuna, spicy mayo, cucumber', price: 7.99, rating: 4.4, calories: 450, allergens: ['fish', 'gluten'] },
            { name: 'Dragon Roll', description: 'Shrimp tempura, avocado, eel sauce', price: 8.99, rating: 4.1, calories: 500, allergens: ['shellfish', 'gluten', 'soy'] },
          ],
        },
        {
          name: 'BBQ Pit',
          description: 'Slow-cooked BBQ meats and sides.',
          location: {
            latitude: 51.0447,
            longitude: -114.0683,
          },
          cuisine: 'American',
          rating: 3.8,
          menu: [
            { name: 'Pulled Pork Sandwich', description: 'Slow-cooked pulled pork, coleslaw, BBQ sauce', price: 9.99, rating: 4.0, calories: 700, allergens: ['gluten'] },
            { name: 'Brisket Plate', description: 'Smoked brisket, mac and cheese, cornbread', price: 14.99, rating: 3.9, calories: 900, allergens: ['gluten', 'dairy'] },
            { name: 'Ribs and Fries', description: 'Smoked baby back ribs, fries, BBQ sauce', price: 12.99, rating: 3.7, calories: 800, allergens: ['gluten'] },
          ],
        },
        {
          name: 'Falafel Fix',
          description: 'Fresh falafel and Mediterranean sides.',
          location: {
            latitude: 51.0523,
            longitude: -114.0623,
          },
          cuisine: 'Mediterranean',
          rating: 4.3,
          menu: [
            { name: 'Falafel Pita', description: 'Freshly made falafel, hummus, lettuce, tomato, cucumber', price: 8.99, rating: 4.4, calories: 500, allergens: ['gluten'] },
            { name: 'Shawarma Plate', description: 'Chicken or beef shawarma, rice, hummus, salad', price: 12.99, rating: 4.5, calories: 800, allergens: ['dairy'] },
            { name: 'Greek Salad', description: 'Tomatoes, cucumbers, feta cheese, olives, red onion', price: 7.99, rating: 4.1, calories: 350, allergens: ['dairy'] },
          ],
        },
      ],
    },
    {
      name: 'Vancouver',
      trucks: [
        {
          name: 'Poutine Palace',
          description: 'Gourmet poutine with a variety of toppings.',
          location: {
            latitude: 49.2827,
            longitude: -123.1207,
          },
          cuisine: 'Canadian',
          rating: 4.7,
          menu: [
            { name: 'Classic Poutine', description: 'Hand-cut fries, cheese curds, gravy', price: 7.99, rating: 4.8, calories: 600, allergens: ['dairy'] },
            { name: 'Butter Chicken Poutine', description: 'Hand-cut fries, cheese curds, butter chicken, cilantro', price: 9.99, rating: 4.9, calories: 800, allergens: ['dairy'] },
            { name: 'Vegan Poutine', description: 'Hand-cut fries, vegan cheese, mushroom gravy', price: 8.99, rating: 4.6, calories: 550, allergens: ['soy'] },
          ],
        },
        {
          name: 'Sushi Squad',
          description: 'Fresh sushi rolls made to order.',
          location: {
            latitude: 49.2820,
            longitude: -123.1171,
          },
          cuisine: 'Japanese',
          rating: 4.5,
          menu: [
            { name: 'California Roll', description: 'Crab, avocado, cucumber', price: 6.99, rating: 4.6, calories: 400, allergens: ['shellfish', 'gluten'] },
            { name: 'Spicy Tuna Roll', description: 'Tuna, spicy mayo, cucumber', price: 7.99, rating: 4.4, calories: 450, allergens: ['fish', 'gluten'] },
            { name: 'Dragon Roll', description: 'Shrimp tempura, avocado, eel sauce', price: 8.99, rating: 4.3, calories: 500, allergens: ['shellfish', 'gluten', 'soy'] },
          ],
        },
        {
          name: 'Curry Corner',
          description: 'Authentic Indian curries and sides.',
          location: {
            latitude: 49.2784,
            longitude: -123.1188,
          },
          cuisine: 'Indian',
          rating: 4.2,
          menu: [
            { name: 'Butter Chicken', description: 'Boneless chicken cooked in a creamy tomato sauce', price: 11.99, rating: 4.3, calories: 800, allergens: ['dairy'] },
            { name: 'Lamb Vindaloo', description: 'Spicy lamb curry with potatoes', price: 12.99, rating: 4.1, calories: 900, allergens: ['none'] },
            { name: 'Vegetable Biryani', description: 'Rice cooked with mixed vegetables and aromatic spices', price: 9.99, rating: 4.0, calories: 700, allergens: ['none'] },
          ],
        },
        {
          name: 'Bao Boss',
          description: 'Fluffy bao buns filled with a variety of fillings.',
          location: {
            latitude: 49.2815,
            longitude: -123.1108,
          },
          cuisine: 'Chinese',
          rating: 4.
                    menu: [
            { name: 'Pork Belly Bao', description: 'Slow-cooked pork belly, hoisin sauce, pickled cucumber', price: 4.99, rating: 4.2, calories: 350, allergens: ['gluten'] },
            { name: 'Kung Pao Chicken Bao', description: 'Spicy chicken, peanuts, green onions', price: 4.99, rating: 4.4, calories: 400, allergens: ['peanuts', 'gluten'] },
            { name: 'Vegetable Bao', description: 'Mixed vegetables, sweet chili sauce', price: 3.99, rating: 4.1, calories: 300, allergens: ['gluten'] },
          ],
        },
        {
          name: 'Sweet Treats',
          description: 'Decadent desserts and sweet treats.',
          location: {
            latitude: 49.2783,
            longitude: -123.1237,
          },
          cuisine: 'Desserts',
          rating: 4.8,
          menu: [
            { name: 'Chocolate Brownie', description: 'Rich chocolate brownie with walnuts', price: 4.99, rating: 4.9, calories: 500, allergens: ['nuts', 'gluten', 'dairy'] },
            { name: 'Apple Pie', description: 'Warm apple pie with cinnamon and vanilla ice cream', price: 5.99, rating: 4.7, calories: 600, allergens: ['gluten', 'dairy'] },
            { name: 'Strawberry Cheesecake', description: 'Creamy cheesecake with fresh strawberries', price: 6.99, rating: 4.8, calories: 700, allergens: ['gluten', 'dairy'] },
          ],
        },
      ],
    },
    {
      name: 'Victoria',
      trucks: [
        {
          name: 'Fish and Chips Shack',
          description: 'Crispy fish and chips with homemade tartar sauce.',
          location: {
            latitude: 48.4284,
            longitude: -123.3656,
          },
          cuisine: 'British',
          rating: 4.5,
          menu: [
            { name: 'Classic Fish and Chips', description: 'Beer-battered haddock, hand-cut fries, tartar sauce', price: 11.99, rating: 4.7, calories: 800, allergens: ['fish', 'gluten'] },
            { name: 'Prawn Po Boy', description: 'Fried prawns, lettuce, tomato, remoulade sauce, baguette', price: 9.99, rating: 4.6, calories: 700, allergens: ['gluten', 'shellfish'] },
            { name: 'Mushy Peas', description: 'Mashed peas with mint', price: 3.99, rating: 4.3, calories: 200, allergens: ['none'] },
          ],
        },
        {
          name: 'Taco Time',
          description: 'Authentic Mexican tacos made to order.',
          location: {
            latitude: 48.4254,
            longitude: -123.3638,
          },
          cuisine: 'Mexican',
          rating: 4.2,
          menu: [
            { name: 'Carnitas Tacos', description: 'Slow-cooked pork, cilantro, onion, lime', price: 3.99,
            { name: 'Grilled Vegetable Tacos', description: 'Grilled peppers, onions, zucchini, avocado salsa', price: 4.99, rating: 4.3, calories: 350, allergens: ['none'] },
            { name: 'Churros', description: 'Cinnamon-sugar coated fried dough, chocolate sauce', price: 2.99, rating: 4.0, calories: 300, allergens: ['gluten', 'dairy'] },
          ],
        },
        {
          name: 'Burger Barn',
          description: 'Juicy burgers made with locally sourced ingredients.',
          location: {
            latitude: 48.4275,
            longitude: -123.3666,
          },
          cuisine: 'American',
          rating: 4.6,
          menu: [
            { name: 'Classic Burger', description: 'Beef patty, lettuce, tomato, onion, ketchup, mustard, mayo', price: 8.99, rating: 4.7, calories: 800, allergens: ['gluten'] },
            { name: 'Bacon Cheeseburger', description: 'Beef patty, bacon, cheddar cheese, lettuce, tomato, onion', price: 10.99, rating: 4.8, calories: 900, allergens: ['gluten', 'dairy'] },
            { name: 'Veggie Burger', description: 'Plant-based patty, lettuce, tomato, onion, special sauce', price: 9.99, rating: 4.3, calories: 700, allergens: ['soy', 'gluten'] },
          ],
        },
        {
          name: 'Pizza Party',
          description: 'Freshly made pizza with a variety of toppings.',
          location: {
            latitude: 48.4246,
            longitude: -123.3657,
          },
          cuisine: 'Italian',
          rating: 4.4,
          menu: [
            { name: 'Margherita Pizza', description: 'Tomato sauce, mozzarella cheese, basil', price: 10.99, rating: 4.2, calories: 800, allergens: ['gluten', 'dairy'] },
            { name: 'Pepperoni Pizza', description: 'Tomato sauce, mozzarella cheese, pepperoni', price: 11.99, rating: 4.3, calories: 900, allergens: ['gluten', 'dairy'] },
            { name: 'Veggie Pizza', description: 'Tomato sauce, mozzarella cheese, mushrooms, onions, peppers', price: 12.99, rating: 4.0, calories: 700, allergens: ['gluten', 'dairy'] },
          ],
        },
        {
          name: 'Thai Temple',
          description: 'Authentic Thai food made fresh daily.',
          location: {
            latitude: 48.4215,
            longitude: -123.3609,
          },
          cuisine: 'Thai',
          rating: 4.3,
          menu: [
            { name: 'Pad Thai', description: 'Stir-fried rice noodles, shrimp, chicken, peanuts, egg, tamarind sauce', price: 12.99, rating: 4.5, calories: 900, allergens: ['nuts', 'shellfish', 'gluten'] },
                        { name: 'Red Curry', description: 'Mild red curry with beef, potatoes, carrots, coconut milk', price: 13.99, rating: 4.2, calories: 1000, allergens: ['nuts'] },
            { name: 'Thai Iced Tea', description: 'Refreshing iced tea with condensed milk', price: 3.99, rating: 4.1, calories: 200, allergens: ['dairy'] },
          ],
        },
      ],
    },
    {
      name: 'Toronto',
      trucks: [
        // Seed data for Toronto trucks goes here
      ],
    },
    {
      name: 'Montreal',
      trucks: [
        // Seed data for Montreal trucks goes here
      ],
    },
  ],
};


