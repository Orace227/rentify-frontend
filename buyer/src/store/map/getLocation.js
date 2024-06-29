export const getLocation = async (lat, lng, placeId) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    );

    const data = await response.json();
    console.log(data);
    if (data.results && data.results.length > 0) {
      //   console.log(data.results);
      const fullAddress = data.results[0].address_components
        .map((component) => component.long_name)
        .join(', ');
      return fullAddress;
    } else {
      console.log('Address not found');
    }
  } catch (error) {
    console.error('Error fetching address:', error);
  }
};
export const getCoordinates = async (locationInText) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        locationInText,
      )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
    );

    const data = await response.json();
    console.log(data);
    if (data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      return { longitude: lng, latitude: lat };
    } else {
      console.log('Coordinates not found');
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
  }
};
