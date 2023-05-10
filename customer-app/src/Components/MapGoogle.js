const MapGoogle = (props) => {
  // const { address } = props;

  const address = '407 Swift St #100, Victoria, BC V8W 1S2';

  const handleClick = () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <a href="#" onClick={handleClick}>
      {address}
    </a>
  );
};

export default MapGoogle;