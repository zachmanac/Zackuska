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
  axios.post(`http://localhost:8080/api/cart`, {cartItems})
      .then(res => {
        // console.log(res);
        console.log(res.data);

      });
};



const ApiCalls = {
  getTrucks,
  getTruck,
  getMenu,
  getMenu2,
  sendCart
};

export default ApiCalls;