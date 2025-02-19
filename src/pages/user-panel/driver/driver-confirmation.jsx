import React, { useEffect, useState } from "react";
import Header from "../../../components/user-panel/header";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BaseURL } from "../../../utils/BaseURL";
import toast from "react-hot-toast";

const DriverConfirmation = () => {
  const { driverId } = useParams();
  const navigate = useNavigate();

  const now = new Date();
  const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

  const [formData, setFormData] = useState({
    driverId,
    location: "",
    carName: "",
    carNumber: "",
    startTime: now.toISOString().slice(0, 16),
    endTime: oneHourLater.toISOString().slice(0, 16),
    paymentMethod: "cash",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, driverId }));
  }, [driverId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const { location, carName, carNumber, startTime, endTime } = formData;
    if (!location || !carName || !carNumber || !startTime || !endTime) {
      setError("All fields are required.");
      return false;
    }
    return true;
  };

  const handleConfirm = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Instead of actual API call, use dummy data and simulate success
      setTimeout(() => {
        // Show success toast/alert
        toast.success("Driver booked successfully! ");

        // Navigate to the ride page
        navigate("/ride");
      }, 1000); // Simulate network delay of 1 second
    } catch (err) {
      setError("An error occurred in the dummy booking process.");
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

          {/* Payment Section */}
          {/* <div className="bg-white rounded-2xl shadow-md p-4">
            <h3 className="text-gray-800 font-semibold mb-2">Payment</h3>
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
          </div> */}
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
