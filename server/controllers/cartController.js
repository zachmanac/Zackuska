const db = require('../../connection');
const { getItemByIdQuery } = require('../database/queries/menu/get_menu_item_by_id');

// Function to add an item to the cart
const addToCart = async (req, itemId) => {
  try {
    // Implement the logic to add the item to the cart
    // This could involve retrieving the cart from the session, adding the item, and updating the session
    const { sessionCart } = req.session;

    // Check if the item is already in the cart
    const existingItem = sessionCart.find((item) => item.itemId === itemId);

    if (existingItem) {
      // If the item already exists, increment the quantity by 1
      existingItem.quantity += 1;
    } else {
      // If the item is not in the cart, add it with a quantity of 1
      sessionCart.push({ itemId, quantity: 1 });
    }

    // Update the session with the modified cart
    req.session.sessionCart = sessionCart;

    // Calculate subtotals, total calories, and other relevant information
    const updatedCart = calculateCartTotals(sessionCart);

    // Return the relevant data in the response
    res.status(200).json({ message: 'Item added to cart successfully', cart: updatedCart });

  } catch (error) {
    throw new Error('Failed to add item to cart');
  }
};

// Function to remove an item from the cart
const removeFromCart = async (req, itemId) => {
  try {
    // Implement the logic to remove the item from the cart
    // This could involve retrieving the cart from the session, finding the item, and removing it from the cart
    const { sessionCart } = req.session;

    // Find the item in the cart
    const itemIndex = sessionCart.findIndex((item) => item.itemId === itemId);

    if (itemIndex !== -1) {
      // Decrease the quantity by 1
      sessionCart[itemIndex].quantity -= 1;

      // Remove the item from the cart if the quantity becomes zero
      if (sessionCart[itemIndex].quantity === 0) {
        sessionCart.splice(itemIndex, 1);
      }
    }

    // Update the session with the modified cart
    req.session.sessionCart = sessionCart;

    // Calculate subtotals, total calories, and other relevant information
    const updatedCart = calculateCartTotals(sessionCart);

    // Return the relevant data in the response
    res.status(200).json({ message: 'Item removed from cart successfully', cart: updatedCart });

  } catch (error) {
    throw new Error('Failed to remove item from cart');
  }
};

// Function to remove an item from the cart completely
const removeItemFromCart = async (req, itemId) => {
  try {
    // Implement the logic to remove the item from the cart completely
    // This could involve retrieving the cart from the session, finding the item, and removing it from the cart
    const { sessionCart } = req.session;

    // Find the item in the cart
    const itemIndex = sessionCart.findIndex((item) => item.itemId === itemId);

    if (itemIndex !== -1) {
      // Remove the item from the cart
      sessionCart.splice(itemIndex, 1);
    }

    // Update the session with the modified cart
    req.session.sessionCart = sessionCart;

    // Calculate subtotals, total calories, and other relevant information
    const updatedCart = calculateCartTotals(sessionCart);

    // Return the relevant data in the response
    res.status(200).json({ message: 'Item removed from cart successfully', cart: updatedCart });

  } catch (error) {
    throw new Error('Failed to remove item from cart');
  }
};

// Function to calculate subtotals, total calories, and other relevant information
const calculateCartTotals = (sessionCart) => {
  let subtotals = 0;
  let totalCalories = 0;

  const updatedCart = sessionCart.map((item) => {
    // Retrieve item details from the database based on the item ID
    const itemDetails = getItemDetailsFromDatabase(item.itemId);

    // Calculate the subtotal for the item based on the price and quantity
    const subtotal = itemDetails.price * item.quantity;

    // Calculate the calories for the item
    const itemCalories = itemDetails.calories * item.quantity;

    // Add the subtotal and calories to the overall totals
    subtotals += subtotal;
    totalCalories += itemCalories;

    // Return the updated item object with additional information
    return {
      ...item,
      subtotal,
      itemCalories,
      truckId: itemDetails.truckId,
    };
  });

  // Calculate additional information such as tax and total
  const tax = subtotals * 0.05; // Assuming 5% tax rate
  const total = subtotals + tax;

  // Add the additional information to the updated cart object
  return {
    cart: updatedCart,
    subtotals,
    totalCalories,
    tax,
    total,
  };
};

// Function to retrieve item details from the database based on the item ID
const getItemDetailsFromDatabase = async (itemId) => {
  try {
    const itemDetails = await getItemByIdQuery(itemId);
    return itemDetails;
  } catch (error) {
    throw new Error('Failed to retrieve item details');
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  removeItemFromCart,
};
