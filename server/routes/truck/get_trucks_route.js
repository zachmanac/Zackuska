const express = require('express');
const router = express.Router();
const queryTrucks= require('../../database/queries/truck/get_trucks');

//get the trucks from the database, need to add the map api

router.get('/api/trucks', (req, res) => {
  const { city, latitude, longitude, cuisine } = req.query;//maybe i also need to get the distance for the search radious from user
  let filter = {};

  if (city) {
    filter.city = city;
  }

  if (latitude) {
    filter.location = location;
  }

  if (longitude) {
    filter.location = location;
  }
  if (cuisine) {
    filter.cuisine = cuisine;
  }

  queryTrucks(filter)
    .then((trucks) => {
      console.log(trucks);
      res.send(trucks);
    })
    .catch(e => {
      console.error("Failed to fetch trucks from the database", e);
      res.send(e);
    });
});


module.exports = router;