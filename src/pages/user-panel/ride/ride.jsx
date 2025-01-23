import React, { useEffect, useState } from "react";
import Header from "../../../components/user-panel/header";
import Carousel from "../../../components/user-panel/carousel";
import RideForm from "../../../components/user-panel/ride-form";
import { BaseURL } from "../../../utils/BaseURL";
import { DotLoader } from "react-spinners";
import toast from "react-hot-toast";

const Ride = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateDriverLocation(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching location:", error);
          toast.error("Error fetching location.");
        },
        { enableHighAccuracy: true }
      );
      // Cleanup on unmount
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.error("Geolocation is not supported by this browser.");
      toast.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const updateDriverLocation = async (latitude, longitude) => {
    console.log("Attempting to update location:", { latitude, longitude });

    try {
      const token = localStorage.getItem("token"); // Get token from localStorage

      if (!token) {
        console.error("No token found in localStorage.");
        toast.error("No token found in localStorage.");
        return;
      }

      const response = await fetch(`${BaseURL}/auth/update-location`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in Authorization header
        },
        body: JSON.stringify({ latitude, longitude }),
      });

      const responseData = await response.json();
      console.log("Response:", response.status, responseData);

      if (!response.ok) {
        console.error("Failed to update location:", responseData);
        toast.error("Failed to update location.");
      }
    } catch (err) {
      console.error("Error updating location:", err);
      toast.error("Error updating location.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <DotLoader color="#A75AF2" />
        </div>
      ) : (
        <div className="grid md:grid-cols-1 min-h-[500px] items-center p-4">
          <RideForm />
          {/* <Map /> */}
        </div>
      )}
      <Carousel />
    </div>
  );
};

export default Ride;
