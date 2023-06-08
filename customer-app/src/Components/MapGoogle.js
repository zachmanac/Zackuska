const MapGoogle = (props) => {
  // const { address } = props;

  // const city = 'Toronto';
  // const addressAndCity = `${address}, ${city}`;
  const addressAndCity = '800 Griffiths Way, Vancouver';
  // const address = '407 Swift St #100, Victoria, BC V8W 1S2';

  const handleClick = () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressAndCity)}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <a href="#" onClick={handleClick}>
      {addressAndCity}
    </a>
  );
};

export default MapGoogle;