import React from "react";
import { Link } from 'react-router-dom';
import './FoodTruckList.scss';
import MapGoogle from "./MapGoogle";
// import { Grid, Typography } from '@mui/material';
// import { makeStyles } from '@mui/styles';

// Define custom styles
// const useStyles = makeStyles((theme) => ({
//   foodTruck: {
//     // display: 'flex',
//     // flexDirection: 'column',
//     // alignItems: 'center',
//     // justifyContent: 'center',
//     // width: 200, // Adjust the width as per your requirement
//     // height: 250, // Adjust the height as per your requirement
//     // padding: theme.spacing(2),
//     // textAlign: 'center',
//     // backgroundColor: theme.palette.background.default,
//     // borderRadius: theme.shape.borderRadius,
//   },
//   foodTruckImage: {
//     // width: '100%',
//     // height: 'auto',
//     // marginBottom: theme.spacing(2),
//   },
// }));


function FoodTruckList(props) {
  const { foodTrucks, setActiveFoodTruck } = props;

  const handleFoodTruckClick = (foodTruck) => {
    setActiveFoodTruck(foodTruck);

  };

  return (
    <div className="food-trucks-container">
      {/* <Grid container spacing={3}> */}
        {foodTrucks &&
          foodTrucks.map((truck) => (
            // <Grid item xs={12} sm={6} md={4} lg={3} key={truck.owner_id}>
                <div className="food-truck">
                  <Link to={`/${truck.truck_id}/menu`} onClick={() => handleFoodTruckClick(truck)} className="food-truck-link">
                    <h3 className="food-truck-orange">{truck.truck_name}</h3>
                    <p>{truck.phone_number}</p>
                    <img src={truck.picture} alt={truck.truck_name} />
                    <p>Facebook: {truck.facebook}</p>
                    <p>Instagram: {truck.instagram}</p>
                    <p>Da cuisine: {truck.cuisine}</p>
                  </Link>
                    <div className="map-container">
                      <MapGoogle address={truck.address} city={truck.city} />
                    </div>
                </div>
            // </Grid>
          ))}
      {/* </Grid> */}
    </div>
  );

}

export default FoodTruckList;