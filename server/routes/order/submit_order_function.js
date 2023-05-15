const axios = require('axios');
const { updateStatus, existingOrder} = require('../../database/queries/order/order_accepted_declined');
async function submitOrder(order_id) {
  try {
    // Check if the order exists
    const order = await existingOrder(order_id);
    if (order.length === 0) {
      return Promise.reject(new Error('Order not found.'));
    }
    console.log('MY PENDING ORDER', order);

    

    //this is just a mock server until we have the food-truck-app running

    /*const truck-response = await axios.post(`http://localhost:3001/api/trucks/orders`, order[0],{
      timeout: 2000 // Timeout value in milliseconds (2 seconds)
    });
    */

    //hardcode the response from food truck to test
    const status = 'accepted';
    const estimatedReadyTime = '20 minutes';
    const explanation="Out of stock";

    // Process the response from the truck
    if (status === 'accepted') {
      // Truck accepted the order
      console.log('Order accepted by the truck');
      const updated_order=await updateStatus(order_id, status);

      return {
        message: 'Order Accepted',
        estimatedReadyTime: estimatedReadyTime,
        order:updated_order
      };
    } else {
      // Truck declined the order
      
      console.log('Order declined by the truck');
      const updated_order=await updateStatus(order_id, status);

      return {
        message: 'Order declined',
        explanation: explanation,
        order: updated_order
      };
    }
  } catch (error) {
    console.error('Failed to submit the order', error);
    return Promise.reject(new Error('An error occurred while submitting the order.'));
  }
}

module.exports = submitOrder;
