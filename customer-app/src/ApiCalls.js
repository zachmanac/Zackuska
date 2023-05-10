import axios from 'axios';

const getTrucks = function (cb) {
  axios.get('http://localhost:8080/api/trucks').then(function (response) {
    cb(response.data);
  })
}

const getMenu = function (truckId, cb) {
  axios.get(`http://localhost:8080/api/trucks/${truckId}/menu_items`).then(function (response) {
    cb(response.data);
  })
}

const sendCart = function (cartItems, cb) {
  axios.post(`https://localhost:8080/api/cart`, {cartItems})
      .then(res => {
        // console.log(res);
        console.log(res.data);

      })
}



export default {
  getTrucks,
  getMenu,
  sendCart
}