import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../../components/user-panel/header"; // Import your Header component
import RideOptions from "../../../components/user-panel/ride-options";
import PaymentSelector from "../../../components/user-panel/payment-selector";
import axios from "axios";
import { BaseURL } from "../../../utils/BaseURL";
import toast, { Toaster } from "react-hot-toast";

const RideSelectionScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rideData, setRideData] = useState(null);

  useEffect(() => {
    console.log(location.state.rideData);
    if (location.state && location.state.rideData) {
      setRideData(location.state.rideData);
    } else {
      toast.error("No ride data found. Please try again.");
      navigate("/ride");
    }
  }, [location.state, navigate]);

  const handleCreateRide = async () => {
    if (!rideData) return;

    setLoading(true);
    try {
      const response = await axios.post(`${BaseURL}/rides/create`, rideData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const rideId = response.data.ride._id;
        waitForRideAcceptance(rideId);
      } else {
        toast.error("Failed to create ride. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Error creating ride. Please try again.");
      console.error("Error creating ride:", error);
      setLoading(false);
    }
  };

  const waitForRideAcceptance = (rideId) => {
    const intervalId = setInterval(async () => {
      try {
        const response = await axios.get(`${BaseURL}/rides/status/${rideId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.status === "accepted") {
          clearInterval(intervalId);
          toast.success("Ride accepted!");
          navigate("/ride/meet", { state: { rideId } });
        }
      } catch (error) {
        console.error("Error checking ride status:", error);
      }
    }, 5000); // Check every 5 seconds
  };

  return (
    <div className="h-screen w-screen">
      <Toaster />
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="relative h-full">
        {/* Map Background */}
        <div className="absolute inset-0 ">
          <img
            title="Map"
            src="/images/full-map-img.png"
            className="w-full h-full"
          />
        </div>

        {/* Floating Cards */}
        <div className="absolute top-[10%] left-[10%]  flex flex-col items-center space-y-4">
          {/* Ride Options */}
          <RideOptions />

          {/* Payment Selector */}
          <PaymentSelector pageLink="#" onClick={handleCreateRide} />
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="loader"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RideSelectionScreen;
