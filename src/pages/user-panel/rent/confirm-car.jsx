import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/user-panel/header";

const ConfirmCar = () => {
  const { id } = useParams(); // Get the car ID from the URL parameters
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [rentStartDate, setRentStartDate] = useState("");
  const [rentEndDate, setRentEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRentCar = async () => {
    setLoading(true);

    try {
      const response = await fetch("https://moovr-api.vercel.app/api/v1/rent/rent", {
        method: "POST",
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODNmNTY1MzEzNTVjMDY5OGViZDE1OSIsInBob25lIjoiKzkyMDAwMDAiLCJyb2xlIjoidXNlciIsImlhdCI6MTczNjcwMTMwMCwiZXhwIjoxNzM3OTk3MzAwfQ.hy2U2MUxXhXpf5iIhxKzsBG71isJGm9JAs0GQCSL4vM", // Replace with your dynamic token
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          carId: id,
          deliveryLocation,
          rentStartDate,
          rentEndDate,
        }),
      });

      const data = await response.json();
      if (data.message === "Car rented successfully") {
        // Redirect to a confirmation page or show success message
        navigate("/rent/car/booked");
      } else {
        alert("Failed to rent the car");
      }
    } catch (error) {
      console.error("Error renting car:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="max-w-[1180px] mx-auto p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex gap-3 items-center mb-8 cursor-pointer py-2 px-3 rounded-[12px] w-fit hover:bg-gray-100"
        >
          <FaMapMarkerAlt size={23} /> Back
        </button>

        {/* Car Image Section */}
        <div className="flex justify-center mb-12">
          <div className="relative w-[600px]">
            <img
              src="/images/BMW.png" // Replace with the actual car image path
              alt="Car"
              className="w-[85%] h-auto object-contain"
            />
            <div className="absolute w-full bottom-[10px] left-1/2 transform -translate-x-1/2 ">
              <img src="/images/car-surface.svg" alt="" />
            </div>
          </div>
        </div>

        {/* Rent Details Section */}
        <div className="bg-white rounded-2xl shadow-md border-[1.4px] border-gray-200 p-6">
          <div className="grid grid-cols-3 items-end gap-6">
            {/* Delivery Location */}
            <div>
              <label className="block text-gray-500 mb-2">Delivery Location</label>
              <div className="relative">
                <input
                  type="text"
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  placeholder="Select delivery point"
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
                />
                <FaMapMarkerAlt className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Rent Start Date/Time */}
            <div>
              <label className="block text-gray-500 mb-2">Rent Date and Time</label>
              <input
                type="datetime-local"
                value={rentStartDate}
                onChange={(e) => setRentStartDate(e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>

            {/* Rent End Date/Time */}
            <div className="mt-6 md:mt-0">
              <input
                type="datetime-local"
                value={rentEndDate}
                onChange={(e) => setRentEndDate(e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          {/* Confirm Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleRentCar}
              className="bg-purple-500 text-white py-3 px-16 rounded-full font-medium hover:bg-purple-600"
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCar;
