import React, { useEffect, useRef } from "react";
import Header from "../../../components/user-panel/header";
import PackageCars from "../../../components/user-panel/package/selection";
import PaymentDropdown from "../../../components/user-panel/package/payment";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseURL } from "../../../utils/BaseURL";
import toast from "react-hot-toast";

const PackageCarSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pickupLocation, deliveryLocation, pickupAddress, deliveryAddress } =
    location.state || {};
  const mapRef = useRef(null);
  const directionsServiceRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const pickupMarkerRef = useRef(null);
  const deliveryMarkerRef = useRef(null);

  useEffect(() => {
    if (pickupLocation && deliveryLocation) {
      const loadGoogleMapsScript = () => {
        if (!window.google) {
          const script = document.createElement("script");
          script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
          script.async = true;
          script.onload = initializeMap;
          document.head.appendChild(script);
        } else {
          initializeMap();
        }
      };

      const initializeMap = () => {
        const google = window.google;
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: pickupLocation,
          zoom: 13,
          disableDefaultUI: true,
        });

        directionsServiceRef.current = new google.maps.DirectionsService();
        directionsRendererRef.current = new google.maps.DirectionsRenderer({
          suppressMarkers: true,
        });
        directionsRendererRef.current.setMap(mapInstance);

        pickupMarkerRef.current = new google.maps.Marker({
          position: pickupLocation,
          map: mapInstance,
          label: "P",
        });

        deliveryMarkerRef.current = new google.maps.Marker({
          position: deliveryLocation,
          map: mapInstance,
          label: "D",
        });

        calculateAndDisplayRoute(pickupLocation, deliveryLocation);
      };

      const calculateAndDisplayRoute = (origin, destination) => {
        const directionsService = directionsServiceRef.current;
        const directionsRenderer = directionsRendererRef.current;

        if (!directionsService || !directionsRenderer) {
          console.error("Google Maps services not initialized yet.");
          return;
        }

        directionsService.route(
          {
            origin,
            destination,
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

      loadGoogleMapsScript();
    }
  }, [pickupLocation, deliveryLocation]);

  const handleCreatePackage = async () => {
    const token = localStorage.getItem("token");
    const packageData = {
      pickupLocation: pickupAddress,
      dropoffLocation: deliveryAddress,
      pickupCoordinates: [pickupLocation.lat, pickupLocation.lng],
      dropoffCoordinates: [deliveryLocation.lat, deliveryLocation.lng],
      packageDetails: "Package details here", // Add actual package details
    };

    try {
      const response = await axios.post(
        `${BaseURL}/package/create`,
        packageData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);

      if (response.status === 200 || 201) {
        toast.success("Package created successfully!");
        navigate("/package/booked");
      } else {
        toast.error("Failed to create package. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to create package. Please try again.");
      console.error("Error creating package:", error);
    }
  };

  return (
    <div className="h-screen w-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="relative h-full">
        {/* Map Background */}
        <div className="absolute inset-0">
          <div ref={mapRef} className="w-full h-full" />
        </div>

        {/* Floating Cards */}
        <div className="absolute top-[10%] left-[10%] flex flex-col items-center space-y-4">
          {/* Ride Options */}
          <PackageCars />

          {/* Payment Selector */}
          <PaymentDropdown onCreatePackage={handleCreatePackage} />
        </div>
      </div>
    </div>
  );
};

export default PackageCarSelection;
