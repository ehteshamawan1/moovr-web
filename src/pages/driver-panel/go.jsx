import React, { useEffect, useState } from "react";
import Header from "../../components/driver-panel/header";
import "../../App.css"; // Include Tailwind styles
import { Link } from "react-router-dom";
import { BaseURL } from "../../utils/BaseURL"; // Make sure to have your BaseURL file
import axios from "axios";
import toast from "react-hot-toast";

const Go = () => {
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateDriverLocation(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching location:", error);
        },
        { enableHighAccuracy: true }
      );
      // Cleanup on unmount
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const updateDriverLocation = async (latitude, longitude) => {
    console.log("Attempting to update location:", { latitude, longitude });

    try {
      const token = localStorage.getItem("token"); // Get token from localStorage

      if (!token) {
        console.error("No token found in localStorage.");
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
      }
    } catch (err) {
      console.error("Error updating location:", err);
    }
  };

  return (
    <div className="relative h-screen flex flex-col">
      <div className="absolute top-0 right-0 left-0 z-10">
        <Header />
      </div>
      <main className="flex-grow h-full bg-gray-100">
        <div className=" h-full">
          <img
            src="/map.png"
            alt="Map"
            className="w-full h-full object-cover"
          />
          <div className="absolute -translate-x-1/2 left-1/2 bottom-5 flex justify-center items-center">
            <div className="go-button-bg-gradient p-5 rounded-full">
              <Link to={"/d/accept"}>
                <button className="go-button-gradient text-white px-6 py-2 h-[100px] w-[100px] rounded-full text-[32px] font-[600]">
                  Go
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Go;
