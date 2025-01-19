"use client";

import { useState, useEffect } from "react";
import Header from "../../components/driver-panel/header";
import { FiChevronDown } from "react-icons/fi";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditListing() {
  const { id } = useParams(); // Get the vehicle id from the URL

  const [availability, setAvailability] = useState("Active");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [carDetails, setCarDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch car details from API
  const fetchCarDetails = async () => {
    try {
      setIsLoading(true);
      const dummyToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODNmNTY1MzEzNTVjMDY5OGViZDE1OSIsInBob25lIjoiKzkyMDAwMDAiLCJyb2xlIjoidXNlciIsImlhdCI6MTczNjcwMTMwMCwiZXhwIjoxNzM3OTk3MzAwfQ.hy2U2MUxXhXpf5iIhxKzsBG71isJGm9JAs0GQCSL4vM"; // Replace this with your actual or dummy token for testing

      const response = await axios.get(
        `https://moovr-api.vercel.app/api/v1/cars/list/${id}`,
        {
          headers: {
            Authorization: `Bearer ${dummyToken}`,
          },
        }
      );

      console.log("API Response:", response);
      if (response.data?.carListing) {
        setCarDetails(response.data.carListing);
        setAvailability(response.data.carListing.status);
        setError(null);
      } else {
        setError("Car details not found.");
      }
    } catch (err) {
      handleError(err, "fetchCarDetails");
    } finally {
      setIsLoading(false);
    }
  };

  // Update car details API call
  const updateCarDetails = async () => {
    const dummyToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODNmNTY1MzEzNTVjMDY5OGViZDE1OSIsInBob25lIjoiKzkyMDAwMDAiLCJyb2xlIjoidXNlciIsImlhdCI6MTczNjcwMTMwMCwiZXhwIjoxNzM3OTk3MzAwfQ.hy2U2MUxXhXpf5iIhxKzsBG71isJGm9JAs0GQCSL4vM"; // Replace this with your actual or dummy token for testing

    try {
      setIsLoading(true);
      const token = localStorage.getItem("auth_token");
      const updatedDetails = {
        vehicleName: carDetails?.vehicleName,
        make: carDetails?.make,
        model: carDetails?.model,
        description: carDetails?.description,
        price: carDetails?.price,
        status: availability,
      };

      const response = await axios.put(
        `https://moovr-api.vercel.app/api/v1/cars/list/${id}`,
        updatedDetails,
        {
          headers: {
            Authorization: `Bearer ${dummyToken}`,
          },
        }
      );
      alert("Car listing updated successfully.");
      setError(null); // Clear error on success
    } catch (err) {
      handleError(err, "updateCarDetails");
    } finally {
      setIsLoading(false);
    }
  };

  // Error handler function
  const handleError = (err, context) => {
    let errorMessage = `Error in ${context}: `;
    if (err.response) {
      // Server responded with a status other than 2xx
      errorMessage += `Status: ${err.response.status}\n`;
      errorMessage += `Data: ${JSON.stringify(err.response.data)}\n`;
      errorMessage += `Headers: ${JSON.stringify(err.response.headers)}`;
    } else if (err.request) {
      // No response received
      errorMessage += "No response received from the server.";
    } else {
      // Request setup error
      errorMessage += `Message: ${err.message}`;
    }
    setError(errorMessage);
  };

  // Fetch car details on component mount
  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-xl font-medium mb-8">Edit Listing</h1>

        {/* Display errors if any */}
        {error && (
          <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded">
            <pre>{error}</pre>
          </div>
        )}

        <div className="space-y-6">
          {/* Vehicle Name Input */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Vehicle Name
            </label>
            <input
              type="text"
              value={carDetails?.vehicleName || ""}
              onChange={(e) =>
                setCarDetails({ ...carDetails, vehicleName: e.target.value })
              }
              className="input-field"
            />
          </div>

          {/* Make Input */}
          <div>
            <label className="block text-sm font-medium mb-1">Make</label>
            <input
              type="text"
              value={carDetails?.make || ""}
              onChange={(e) =>
                setCarDetails({ ...carDetails, make: e.target.value })
              }
              className="input-field"
            />
          </div>

          {/* Model Input */}
          <div>
            <label className="block text-sm font-medium mb-1">Model</label>
            <input
              type="text"
              value={carDetails?.model || ""}
              onChange={(e) =>
                setCarDetails({ ...carDetails, model: e.target.value })
              }
              className="input-field"
            />
          </div>

          {/* Price Input */}
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              value={carDetails?.price || ""}
              onChange={(e) =>
                setCarDetails({ ...carDetails, price: e.target.value })
              }
              className="input-field"
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={carDetails?.description || ""}
              onChange={(e) =>
                setCarDetails({ ...carDetails, description: e.target.value })
              }
              className="textarea-field"
            ></textarea>
          </div>

          {/* Availability Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="input-field flex items-center gap-2"
            >
              {availability}
              <FiChevronDown />
            </button>

            {isDropdownOpen && (
              <div className="absolute mt-2 w-full bg-white border rounded shadow-lg z-10">
                {["Active", "Inactive"].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setAvailability(status);
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Update Button */}
          <button
            onClick={updateCarDetails}
            className="px-6 py-2 bg-[#8257E9] text-white rounded-full hover:bg-[#7347d5]"
          >
            Update
          </button>
        </div>
      </main>
    </div>
  );
}
