import axios from 'axios';
axios.defaults.withCredentials = true;

const baseURL = "http://localhost:8080";

const getAllOrders = async (foodTruckId) => {
  try {
    // get all orders for an individuals(owners) truck
    const response = await axios.get(`${baseURL}/api/trucks/${foodTruckId}/orders`);
    return response.data;
  } catch (error) {
    console.error('Error fetching current orders:', error);
    throw error;
  }
};

const acceptOrder = async (truckId, orderId) => {
  try {
    await axios.post(`${baseURL}/api/trucks/${truckId}/${orderId}/accepted`);
  } catch (error) {
    console.error('Error accepting order:', error);
    throw error;
  }
};

const declineOrder = async (truckId, orderId) => {
  try {
    await axios.post(`${baseURL}/api/trucks/${truckId}/${orderId}/declined`);
  } catch (error) {
    console.error('Error declining order:', error);
    throw error;
  }
};

const getTruckData = async () => {
  try {
    await axios.get(`${baseURL}/api/trucks/dashboard`)
  } catch (error) {
    console.error(error);
    throw error;
  }
}


const ApiCallsOwner = {
  getAllOrders,
  acceptOrder,
  declineOrder,
  getTruckData
}

export default ApiCallsOwner;