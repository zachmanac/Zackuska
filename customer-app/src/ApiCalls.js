import axios from 'axios';

const getTrucks = function () {
  return axios.get('http://localhost:8080/api/trucks')
    .then(function (response) {
      return response.data;
    });
};

const getTruck = async function (truckId) {
  const response = await axios.get(`http://localhost:8080/api/trucks/${truckId}`);
  return response.data;
};

const getMenu = function (truckId) {
  return axios.get(`http://localhost:8080/api/trucks/${truckId}/menu_items`)
    .then(function (response) {
      return response.data;
    });
};

const getMenu2 = async function (truckId) {
  const response = await axios.get(`http://localhost:8080/api/trucks/${truckId}/menu_items`);
  return response.data;
};

const sendCart = function (cartItems, cb) {
  axios.post('http://localhost:8080/api/cart/add', cartItems)
    .then(res => {
      console.log(res.data);
      if (cb) {
        cb();
      }
    })
    .catch(error => {
      console.error('Failed to send cart:', error);
    });
};

const updateCart = function (cartId, quantity, cb) {
  axios.put(`http://localhost:8080/api/cart/${cartId}`, { quantity })
    .then(res => {
      console.log(res.data);
      if (cb) {
        cb();
      }
    })
    .catch(error => {
      console.error('Failed to update cart:', error);
    });
};

const deleteCartItem = function (cartId, cb) {
  axios.delete(`http://localhost:8080/api/cart/${cartId}`)
    .then(res => {
      console.log(res.data);
      if (cb) {
        cb();
      }
    })
    .catch(error => {
      console.error('Failed to delete cart item:', error);
    });
};

const ApiCalls = {
  getTrucks,
  getTruck,
  getMenu,
  getMenu2,
  sendCart,
  updateCart,
  deleteCartItem
};

export default ApiCalls;
