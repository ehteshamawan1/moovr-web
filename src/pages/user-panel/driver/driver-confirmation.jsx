import React, { useState } from "react";
import Header from "../../../components/user-panel/header";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DriverConfirmation = () => {
  const { driverId } = useParams(); // Extract driverId from URL params
  const navigate = useNavigate();

  // State to manage form data
  const [formData, setFormData] = useState({
    driver: driverId,
    location: "",
    carName: "",
    carNumber: "",
    startTime: new Date().toISOString().slice(0, 16), // Default start time in ISO format
    endTime: new Date().toISOString().slice(0, 16), // Default end time in ISO format
    paymentMethod: "credit_card", // Default payment method
  });

  // State for loading and error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleConfirm = async () => {
    setLoading(true);
    setError("");

    if (!formData.driver) {
      setError("Driver ID is missing.");
      setLoading(false);
      return;
    }

    try {
      const token =        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODNmNTY1MzEzNTVjMDY5OGViZDE1OSIsInBob25lIjoiKzkyMDAwMDAiLCJyb2xlIjoidXNlciIsImlhdCI6MTczNjcwMTMwMCwiZXhwIjoxNzM3OTk3MzAwfQ.hy2U2MUxXhXpf5iIhxKzsBG71isJGm9JAs0GQCSL4vM"; // Replace this with your actual or dummy token for testing
      // Retrieve token from localStorage
      if (!token) {
        throw new Error("Authentication token is missing. Please log in again.");
      }

      const response = await axios.post(
        "https://moovr-api.vercel.app/api/v1/bookings/book",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message === "Driver booked successfully") {
        alert("Driver booked successfully!");
        navigate("/driver/start");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An unexpected error occurred.";
      const errorDetails = err.response?.data?.details || null;

      setError(errorDetails ? `${errorMessage}: ${errorDetails}` : errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full">
      <Header />
      <div className="relative min-h-[800px] h-screen w-full">
        {/* Map Background */}
        <div className="absolute inset-0 w-full h-full">
          <img
            title="Map"
            src="/images/full-map-img.png"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Floating Card Section */}
        <div className="absolute top-20 left-6 space-y-4">
          <button
            onClick={() => navigate(-1)}
            className="flex gap-3 items-center mb-8 cursor-pointer py-2 px-3 rounded-[12px] w-fit hover:bg-gray-100"
          >
            <BiArrowBack size={23} /> Back
          </button>
          <div className="bg-white rounded-2xl shadow-md p-4">
            <h3 className="text-gray-800 font-semibold mb-2">Location</h3>
            <input
              type="text"
              name="location"
              placeholder="Select pick-up point"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 bg-bgGray rounded-lg focus:outline-none text-gray-600"
            />
          </div>
          <div className="bg-white rounded-2xl shadow-md p-4">
            <h3 className="text-gray-800 font-semibold mb-2">Car details</h3>
            <div className="space-y-2">
              <input
                type="text"
                name="carName"
                placeholder="Car name/model"
                value={formData.carName}
                onChange={handleChange}
                className="w-full p-3 bg-bgGray rounded-lg focus:outline-none text-gray-600"
              />
              <input
                type="text"
                name="carNumber"
                placeholder="Car number"
                value={formData.carNumber}
                onChange={handleChange}
                className="w-full p-3 bg-bgGray rounded-lg focus:outline-none text-gray-600"
              />
            </div>
          </div>

          {/* Time Details Section */}
          <div className="bg-white rounded-2xl shadow-md p-4">
            <h3 className="text-gray-800 font-semibold mb-2">Time Details</h3>
            <div className="space-y-2">
              <label className="text-gray-600">Start Time</label>
              <input
                type="datetime-local"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full p-3 bg-bgGray rounded-lg focus:outline-none text-gray-600"
              />
              <label className="text-gray-600">End Time</label>
              <input
                type="datetime-local"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full p-3 bg-bgGray rounded-lg focus:outline-none text-gray-600"
              />
            </div>
          </div>

          {/* Payment and Status Section */}
          <div className="bg-white rounded-2xl shadow-md p-4">
            <h3 className="text-gray-800 font-semibold mb-2">Payment & Status</h3>
            <div className="space-y-2">
              <label className="text-gray-600">Payment Method</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full p-3 bg-bgGray rounded-lg focus:outline-none text-gray-600"
              >
                <option value="credit_card">Credit Card</option>
                <option value="cash">Cash</option>
                <option value="mobile_payment">Mobile Payment</option>
              </select>
            </div>
          </div>
        </div>

        {/* Price and Confirm Section */}
        <div className="absolute bottom-20 right-6 min-w-[400px] space-y-4">
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center space-y-4">
            <div className="w-full flex justify-between items-center">
              <p className="text-gray-700 font-medium">Price</p>
              <p className="text-xl font-semibold">
                ₦7.80<span className="text-gray-500 text-sm">/hour</span>
              </p>
            </div>
            <button
              onClick={handleConfirm}
              className="bg-purple-500 text-center text-white py-3 w-full rounded-full text-lg font-semibold hover:bg-purple-600"
              disabled={loading}
            >
              {loading ? "Booking..." : "Confirm"}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverConfirmation;
