import React, { useState, useRef, useEffect } from "react";
import Header from "../../../components/user-panel/header"; // Import your Header component
import { FaArrowLeft } from "react-icons/fa"; // For the map marker icon
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseURL } from "../../../utils/BaseURL";
import toast, { Toaster } from "react-hot-toast";

const ConfirmPickup = () => {
  const [pickupLocation, setPickupLocation] = useState(null);
  const [pickupAddress, setPickupAddress] = useState("");
  const [isMapsReady, setIsMapsReady] = useState(false);
  const mapRef = useRef(null);
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

      initializeAutocomplete("pickup");

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

        setPickupLocation(location);
        setPickupAddress(place.formatted_address || "");

        mapInstance.current.setCenter(place.geometry.location);
        mapInstance.current.setZoom(14);
      });
    };

    loadGoogleMapsScript();
  }, []);

  const handleConfirmPickup = () => {
    if (!pickupLocation) {
      toast.error("Please select a valid pickup location.");
      return;
    }

    // Navigate to the next page with the selected pickup location
    navigate("/package/delivery", { state: { pickupLocation, pickupAddress } });
  };

  return (
    <div className="h-screen w-screen">
      <Toaster />
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className=" relative h-full">
        {/* Map Background */}
        <div className="absolute inset-0">
          <div ref={mapRef} className="w-full h-full" />
        </div>

        <div className="max-w-[1180px] mx-auto">
          {/* Floating Card for Pickup Selection */}
          <div className=" absolute top-[10%] left-[10%] transform md:w-[400px]  space-y-4 w-[80%] ">
            {/* Search Input */}

            {/* Back Button */}
            <Link
              to={"/package"}
              className="flex items-center mb-20 cursor-pointer"
            >
              <FaArrowLeft className="text-lg mr-2" />
              <span className="text-sm font-medium">Back</span>
            </Link>
            <div className="relative mb-4">
              <IoSearch
                className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-600"
                size={20}
              />
              <input
                type="text"
                id="pickup-input"
                placeholder="Select pickup point"
                className="w-full pl-12 px-6 py-4 border rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className=" p-4 md:p-7 bg-white rounded-lg shadow-lg">
              <div className=" text-lg font-semibold">Choose pickup point</div>

              {/* Instruction Text */}
              <div className="text-sm text-start text-gray-500 my-2 pb-4">
                Drag map to adjust
              </div>

              {/* Confirm Button */}
              <button
                onClick={handleConfirmPickup}
                className="w-full py-3 flex justify-center rounded-full bg-purple-500 text-white font-semibold hover:bg-purple-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPickup;
