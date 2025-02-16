import React, { useEffect, useState } from "react";
import Header from "../../components/driver-panel/header";
import { MdOutlinePersonOutline } from "react-icons/md";
import { IoIosStar } from "react-icons/io";
import { BaseURL } from "../../utils/BaseURL";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { DotLoader } from "react-spinners";

const Accept = () => {
  const [availableRides, setAvailableRides] = useState([]);
  const [availablePackages, setAvailablePackages] = useState([]);
  const [availableIntercityRides, setAvailableIntercityRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("rides");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAvailableRides = async () => {
      try {
        const token = localStorage.getItem("token");

        const [ridesResponse, reserveResponse, intercityResponse] =
          await Promise.all([
            axios.get(`${BaseURL}/rides/available`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            axios.get(`${BaseURL}/package/available`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            axios.get(`${BaseURL}/intercityRides/get/available`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);

        // Log the responses for debugging
        console.log("Rides Response:", ridesResponse?.data);
        console.log("Packages Response:", reserveResponse);
        console.log("Intercity Rides Response:", intercityResponse?.data);

        setAvailableRides(ridesResponse?.data?.availableRides || []);
        setAvailablePackages(reserveResponse?.data?.availablePackages || []); // Correct key
        setAvailableIntercityRides(
          intercityResponse?.data?.availableRides || []
        );
      } catch (error) {
        toast.error("Error fetching available rides. Please try again.");
        console.error("Error fetching available rides:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableRides();
  }, []);

  const handleAccept = async (ride) => {
    try {
      let response;
      const token = localStorage.getItem("token");

      if (activeTab === "rides") {
        response = await axios.post(
          `${BaseURL}/rides/accept/${ride._id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else if (activeTab === "packages") {
        response = await axios.post(
          `${BaseURL}/package/accept/${ride._id}`, // Corrected URL
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else if (activeTab === "intercity") {
        response = await axios.post(
          `${BaseURL}/intercityrides/accept/${ride._id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (response.status === 200) {
        // Remove the accepted ride from the respective tab
        if (activeTab === "rides") {
          setAvailableRides((prevRides) =>
            prevRides.filter((r) => r._id !== ride._id)
          );
        } else if (activeTab === "packages") {
          setAvailablePackages((prevRides) =>
            prevRides.filter((r) => r._id !== ride._id)
          );
        } else if (activeTab === "intercity") {
          setAvailableIntercityRides((prevRides) =>
            prevRides.filter((r) => r._id !== ride._id)
          );
        }
        toast.success("Ride accepted successfully!");
        navigate("/d/reached", { state: { ride, activeTab } });
      } else {
        toast.error("Failed to accept the ride. Please try again.");
      }
    } catch (error) {
      toast.error("Error accepting the ride. Please try again.");
      console.error("Error accepting the ride:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-100 flex items-center justify-center">
          <DotLoader color="#A75AF2" />
        </main>
      </div>
    );
  }

  const renderRides = (rides) => (
    <div className="grid grid-cols-1 gap-4 p-4">
      {rides.length > 0 ? (
        rides.map((ride) => (
          <div
            key={ride._id}
            className="relative bg-white shadow-lg rounded-lg p-6 max-w-[282px] mx-auto"
          >
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
                  {ride.fare}
                </p>
                <p className="text-[12px] text-black/50">Includes 5% tax</p>
                <p className="flex items-center gap-2 text-[12px] text-black">
                  <IoIosStar className="text-primaryPurple" />{" "}
                  {ride.rating || 4.3} Cash Payment
                </p>
                <p className="text-[12px] text-black/50">{ride.type}</p>
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
              onClick={() => handleAccept(ride)}
              className="bg-primaryPurple text-white w-full mt-4 py-4 font-[600] rounded-full"
            >
              Accept
            </button>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500">
          No rides available.
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-100">
        <div className="flex justify-center mt-4">
          <button
            className={`px-4 py-2 mx-2 rounded-full ${
              activeTab === "rides" ? "bg-primaryPurple text-white" : "bg-white"
            }`}
            onClick={() => setActiveTab("rides")}
          >
            Rides
          </button>
          <button
            className={`px-4 py-2 mx-2 rounded-full ${
              activeTab === "packages"
                ? "bg-primaryPurple text-white"
                : "bg-white"
            }`}
            onClick={() => setActiveTab("packages")}
          >
            packages
          </button>
          <button
            className={`px-4 py-2 mx-2 rounded-full ${
              activeTab === "intercity"
                ? "bg-primaryPurple text-white"
                : "bg-white"
            }`}
            onClick={() => setActiveTab("intercity")}
          >
            Intercity Rides
          </button>
        </div>

        {activeTab === "rides" && renderRides(availableRides)}
        {activeTab === "packages" && renderRides(availablePackages)}
        {activeTab === "intercity" && renderRides(availableIntercityRides)}
      </main>
    </div>
  );
};

export default Accept;
