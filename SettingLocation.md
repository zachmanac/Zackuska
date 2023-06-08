save it as `SetLocation.js` in the `src/components folder`.

Then, you can import and use this component in any other React component by importing it like this:
```js
import SetLocation from './components/SetLocation';
```

import React, { useState } from 'react';
import axios from 'axios';

function SetLocation() {
  const [location, setLocation] = useState({
    latitude: '',
    longitude: '',
  });

  // Load the Google Maps API script when the component mounts
  React.useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    script.onload = () => {
      // Initialize the map
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: location.latitude, lng: location.longitude },
        zoom: 15,
      });

      // Add a marker for the current location
      const marker = new window.google.maps.Marker({
        position: { lat: location.latitude, lng: location.longitude },
        map: map,
        title: 'Current location',
      });

      // Add an event listener to update the location when the user clicks on the map
      window.google.maps.event.addListener(map, 'click', (event) => {
        setLocation({
          latitude: event.latLng.lat(),
          longitude: event.latLng.lng(),
        });

        // Remove the old marker
        marker.setMap(null);

        // Add a new marker for the updated location
        marker.setMap(map);
        marker.setPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      });
    };
    document.body.appendChild(script);

    // Clean up function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, [location.latitude, location.longitude]);

  const handleSaveLocation = async () => {
    try {
      // Send an HTTP request to save the location to the server
      const response = await axios.post('/api/save-location', location);
      console.log('Location saved:', response.data);
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <button onClick={handleSaveLocation}>Save Location</button>
    </div>
  );
}

export default SetLocation;
