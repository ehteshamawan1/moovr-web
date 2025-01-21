import React, { useEffect, useState } from "react";
import Header from "../../components/driver-panel/header";
import { MdOutlinePersonOutline } from "react-icons/md";
import { IoIosStar } from "react-icons/io";
import { BaseURL } from "../../utils/BaseURL";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Accept = () => {
  const [availableRides, setAvailableRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch available rides when the component is mounted
  useEffect(() => {
    const fetchAvailableRides = async () => {
      try {
        const response = await axios.get(`${BaseURL}/rides/available`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure the driver is authenticated
          },
        });

        setAvailableRides(response.data.availableRides); // Save available rides in state
      } catch (error) {
        toast.error("Error fetching available rides. Please try again.");
        console.error("Error fetching available rides:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableRides();
  }, []); // Empty dependency array to run the effect once on mount

  const handleAccept = async (ride) => {
    try {
      const response = await axios.post(
        `${BaseURL}/rides/accept/${ride._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Remove the accepted ride from the available rides
        setAvailableRides((prevRides) =>
          prevRides.filter((r) => r._id !== ride._id)
        );
        toast.success("Ride accepted successfully!");
        navigate("/d/reached", { state: { ride } });
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
          <p>Loading available rides...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-100">
        {availableRides.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 p-4">
            {availableRides.map((ride) => (
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
                  onClick={() => handleAccept(ride)}
                  className="bg-primaryPurple text-white w-full mt-4 py-4 font-[600] rounded-full"
                >
                  Accept
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>No available rides at the moment.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Accept;
