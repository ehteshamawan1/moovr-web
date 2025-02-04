import React, { useState, useRef, useEffect } from "react";
import Header from "../../../components/user-panel/header";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { BaseURL } from "../../../utils/BaseURL";
import io from "socket.io-client"; // Import Socket.io client

const TrackPackage = ({ packageId }) => {
  const [driverLocation, setDriverLocation] = useState(null);
  const [isMapsReady, setIsMapsReady] = useState(false);
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const driverMarker = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize Socket connection
    socketRef.current = io("http://localhost:5000");
    // Listen for real-time location updates from the backend
    socketRef.current.on("connect", () => {
      console.log(
        "Connected to the server with socket ID:",
        socketRef.current.id
      );
    });
    
    console.log("ؤہرکینگ؟؟؟");
    socketRef.current.on("driverLocationUpdate", (location) => {
      console.log("Driver location updated:", location);
      setDriverLocation(location);

      // Update marker position on the map
      // if (mapInstance.current && window.google && driverLocation) {
      //   const google = window.google;

      //   if (!driverMarker.current) {
      //     driverMarker.current = new google.maps.Marker({
      //       position: location,
      //       map: mapInstance.current,
      //       label: "Driver",
      //     });
      //   } else {
      //     driverMarker.current.setPosition(location);
      //   }

      //   // Center map on the updated location
      //   mapInstance.current.setCenter(location);
      // }
    });

    // Cleanup socket listener when component unmounts
    return () => {
      socketRef.current.off("updateDriverLocation");
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    // Load Google Maps script if it's not already loaded
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

      // Initialize the map centered on a default location (or use the driver's initial location)
      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: { lat: 51.505, lng: -0.09 }, // Default center, will be updated once driver location is fetched
        zoom: 13,
      });

      setIsMapsReady(true);
    };

    loadGoogleMapsScript();
  }, []);

  return (
    <div className="h-screen w-screen">
      <Toaster />
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="relative h-full">
        {/* Back Button */}
        <Link
          to={"/package"}
          className="absolute top-4 left-4 z-10 flex items-center cursor-pointer"
        >
          <FaArrowLeft className="text-lg mr-2" />
          <span className="text-sm font-medium">Back</span>
        </Link>

        {/* Google Map */}
        <div ref={mapRef} className="w-full h-full" />
      </div>
    </div>
  );
};

export default TrackPackage;
