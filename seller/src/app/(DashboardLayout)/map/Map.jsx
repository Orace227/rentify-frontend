import React, { useEffect, useState } from 'react';
import { AdvancedMarker, APIProvider, Map, Pin } from '@vis.gl/react-google-maps';

const MapWithMarker = ({ setAddressComponents, setCoordinates }) => {
  const defaultPosition = { lat: 23.0838179227788, lng: 72.53055810928345 };
  const [markerPosition, setMarkerPosition] = useState(defaultPosition);

  const handleMapClick = async (event) => {
    console.log(event.detail, event.detail.placeId);
    const { lat, lng } = event.detail.latLng;
    const placeId = event.detail.placeId;
    const newPosition = { lat, lng };
    setMarkerPosition(newPosition);

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        console.log(data.results);
        setAddressComponents(data.results[0].address_components);
        setCoordinates(newPosition);
      } else {
        console.log('Address not found');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Error fetching address');
    }
  };
  useEffect(() => {
    // Fetch user's current location using Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMarkerPosition({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting user location:', error);
          // Handle errors here
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      // Handle unsupported browser here
    }
  }, []);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div className="m-4 mt-8 w-[100%] ">
        <Map
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
          defaultCenter={defaultPosition}
          defaultZoom={9}
          width="100%"
          height="100%"
          onClick={handleMapClick}
          streetViewControl={false}
          fullscreenControl={false}
        >
          {/* Render custom marker */}
          {markerPosition && (
            <AdvancedMarker position={markerPosition}>
              <Pin background={'orange'} borderColor={'black'} glyphColor={'white'} />
            </AdvancedMarker>
          )}
        </Map>
      </div>
    </APIProvider>
  );
};

export default MapWithMarker;
