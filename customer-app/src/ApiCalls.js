import axios from 'axios';

const getTrucks = function () {
  axios.get('api/trucks').then(function (response) {
    console.log(response.data);
    return response.data;
  })
}

const getMenu = function () {
  axios.get('api/:truck_id/menu').then(function (response) {
    console.log(response.data)
    return response.data;
  })
}

export default {
  getTrucks,
  getMenu
}