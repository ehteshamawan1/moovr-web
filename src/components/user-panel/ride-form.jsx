import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { BaseURL } from "../../utils/BaseURL";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { DotLoader } from "react-spinners";

const RideForm = () => {
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [isMapsReady, setIsMapsReady] = useState(false);
  const [distance, setDistance] = useState(null);
  const [pickupType, setPickupType] = useState("now");
  const [scheduleTime, setScheduleTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef(null);
  const directionsServiceRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const mapInstance = useRef(null);
  const navigate = useNavigate();

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
          setPickupAddress(place.formatted_address || "");
        } else {
          setDropoffLocation(location);
          setDropoffAddress(place.formatted_address || "");
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
          const route = result.routes[0];
          const distanceInKm = route.legs[0].distance.value / 1000;
          setDistance(distanceInKm);
        } else {
          console.error(`Directions request failed due to ${status}`);
        }
      }
    );
  };

  const handleCreateRide = async () => {
    if (!pickupLocation || !dropoffLocation || distance === null) {
      toast.error("Please enter valid pickup and dropoff locations.");
      return;
    }

    setIsLoading(true);

    const rideData = {
      pickupLocation: pickupAddress,
      dropoffLocation: dropoffAddress,
      pickupCoordinates: [pickupLocation.lng, pickupLocation.lat],
      dropoffCoordinates: [dropoffLocation.lng, dropoffLocation.lat],
      distance,
      pickupType,
      scheduleTime: pickupType === "later" ? scheduleTime : null,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${BaseURL}/rides/create`, rideData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Ride created successfully: " + response.data.message);

      // Open full map with pickup and dropoff markers
      const google = window.google;
      const fullMap = new google.maps.Map(mapRef.current, {
        center: pickupLocation,
        zoom: 10,
      });

      new google.maps.Marker({
        position: pickupLocation,
        map: fullMap,
        label: "P",
      });

      new google.maps.Marker({
        position: dropoffLocation,
        map: fullMap,
        label: "D",
      });

      directionsRendererRef.current.setMap(fullMap);
      directionsRendererRef.current.setDirections(null);
      calculateAndDisplayRoute();
    } catch (error) {
      console.error("Error creating ride:", error);
      toast.error("Failed to create ride. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg w-full max-w-6xl mx-auto ">
      <Toaster />
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

          <div className="flex items-center bg-gray-100 rounded-full px-4 py-4">
            <select
              value={pickupType}
              onChange={(e) => setPickupType(e.target.value)}
              className="bg-transparent focus:outline-none w-full"
            >
              <option value="now">Pickup Now</option>
              <option value="later">Schedule Later</option>
            </select>
          </div>

          {pickupType === "later" && (
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-4">
              <input
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="bg-transparent focus:outline-none w-full"
                placeholder="Pickup Time"
              />
            </div>
          )}

          <button
            type="button"
            onClick={handleCreateRide}
            disabled={!isMapsReady || !pickupLocation || !dropoffLocation}
            className={`w-full py-3 text-lg rounded-full ${
              isMapsReady && pickupLocation && dropoffLocation
                ? "bg-purple-500 text-white hover:bg-purple-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isLoading ? <DotLoader color="#fff" size={24} /> : "Create Ride"}
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
