import React, { useState, useRef, useEffect } from "react";

const RideForm = () => {
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);
  const [isMapsReady, setIsMapsReady] = useState(false);
  const mapRef = useRef(null);
  const directionsServiceRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC9NY_mMXuLB2oTMbZMG4vYO0Y0VqfbrlQ&libraries=places`;
        script.async = true;
        script.onload = initializeMap;
        document.head.appendChild(script);
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      const google = window.google;
      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: { lat: 51.505, lng: -0.09 },
        zoom: 13,
      });

      directionsServiceRef.current = new google.maps.DirectionsService();
      directionsRendererRef.current = new google.maps.DirectionsRenderer();
      directionsRendererRef.current.setMap(mapInstance.current);

      initializeAutocomplete("pickup");
      initializeAutocomplete("dropoff");

      setIsMapsReady(true);
    };

    const initializeAutocomplete = (type) => {
      const input = document.getElementById(`${type}-input`);
      const autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.bindTo("bounds", mapInstance.current);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) return;

        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        if (type === "pickup") {
          setPickupLocation(location);
        } else {
          setDropoffLocation(location);
        }

        mapInstance.current.setCenter(place.geometry.location);
        mapInstance.current.setZoom(14);
      });
    };

    loadGoogleMapsScript();
  }, []);

  useEffect(() => {
    if (pickupLocation && dropoffLocation) {
      calculateAndDisplayRoute();
    }
  }, [pickupLocation, dropoffLocation]);

  const calculateAndDisplayRoute = () => {
    const directionsService = directionsServiceRef.current;
    const directionsRenderer = directionsRendererRef.current;

    if (!directionsService || !directionsRenderer) {
      console.error("Google Maps services not initialized yet.");
      return;
    }

    directionsService.route(
      {
        origin: pickupLocation,
        destination: dropoffLocation,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(result);
        } else {
          console.error(`Directions request failed due to ${status}`);
        }
      }
    );
  };

  return (
    <div className="bg-white p-8 rounded-lg w-full max-w-6xl mx-auto ">
      <h3 className="text-xl font-semibold mb-4">Get your ride</h3>
      <div className="flex flex-col items-center lg:flex-row gap-6">
        {/* Input Fields */}
        <form className="space-y-6 w-full lg:w-1/2">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-4">
            <input
              id="pickup-input"
              type="text"
              placeholder="Enter pickup location"
              className="bg-transparent focus:outline-none w-full"
            />
          </div>

          <div className="flex items-center bg-gray-100 rounded-full px-4 py-4">
            <input
              id="dropoff-input"
              type="text"
              placeholder="Enter dropoff location"
              className="bg-transparent focus:outline-none w-full"
            />
          </div>

          <button
            type="button"
            onClick={calculateAndDisplayRoute}
            disabled={!isMapsReady}
            className={`w-full py-3 text-lg rounded-full ${
              isMapsReady
                ? "bg-purple-500 text-white hover:bg-purple-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Search
          </button>
        </form>

        {/* Map Section */}
        <div
          ref={mapRef}
          className="w-full lg:w-1/2 h-64 lg:h-[250px] xl:h-[350px] rounded-lg"
        ></div>
      </div>
    </div>
  );
};

export default RideForm;
