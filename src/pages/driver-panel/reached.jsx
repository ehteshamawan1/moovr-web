import React, { useEffect, useState } from "react";
import Header from "../../components/driver-panel/header";
import { MdOutlinePersonOutline } from "react-icons/md";
import { IoIosStar } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BaseURL } from "../../utils/BaseURL";

const Reached = () => {
  const location = useLocation();
  const { ride, activeTab } = location.state; // Destructure activeTab
  const navigate = useNavigate();

  const handleStartRide = async () => {
    try {
      let response;

      // Determine the API endpoint based on activeTab
      if (activeTab === "rides") {
        response = await axios.put(
          `${BaseURL}/rides/status/${ride._id}`,
          { status: "running" },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else if (activeTab === "intercity") {
        response = await axios.put(
          `${BaseURL}/intercityrides/status/${ride._id}`,
          { status: "running" },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else if (activeTab === "packages") {
        response = await axios.put(
          `${BaseURL}/package/status/${ride._id}`,
          { status: "running" },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (response.status === 200) {
        toast.success("Ride started successfully!");
        navigate("/d/end", { state: { ride, activeTab } });
      } else {
        toast.error("Failed to start the ride. Please try again.");
      }
    } catch (error) {
      toast.error("Error starting the ride. Please try again.");
      console.error("Error starting the ride:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-100">
        <div className="relative h-[80vh]">
          <img
            src="/map.png"
            alt="Map"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex justify-between items-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-[282px]">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex flex-col justify-center items-center w-full gap-1">
                  <div className="w-10 h-10 bg-primaryPurple rounded-full flex items-center justify-center text-white">
                    <MdOutlinePersonOutline size={25} />
                  </div>
                  <h2 className="text-[16px] font-[600]">
                    {ride.driverName || "MoovR X"}
                  </h2>
                  <p className="font-[600] text-[24px]">
                    <span className="text-[14px] mr-1">₦</span>
                    {ride.price}
                  </p>
                  <p className="text-[12px] text-black/50">Includes 5% tax</p>
                  <p className="flex items-center gap-2 text-[12px] text-black">
                    <IoIosStar className="text-primaryPurple" />{" "}
                    {ride.rating || 4.3} Cash Payment
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <img
                  className="mt-2"
                  src="/driver/horizontal-sm-connector.svg"
                  alt=""
                />
                <div>
                  <div className="mb-4 text-black text-[16px]">
                    <p>
                      <span>
                        {ride.timeToPickup || "5 mins"} (
                        {ride.distanceToPickup || "1.3km"})
                      </span>{" "}
                      away
                    </p>
                    <p className="text-[12px] text-black/50">
                      {ride.pickupLocation}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span>
                        {ride.estimatedTime || "15 mins"} (
                        {ride.estimatedDistance || "4.5km"})
                      </span>{" "}
                      trip
                    </p>
                    <p className="text-[12px] text-black/50">
                      Dropoff: {ride.dropoffLocation}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleStartRide}
                className="bg-primaryPurple text-white w-full mt-4 py-4 font-[600] rounded-full"
              >
                Go
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reached;
