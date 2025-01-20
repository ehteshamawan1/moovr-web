import React, { useState, useEffect } from "react";
import Header from "../../../components/user-panel/header"; // Import your Header component
import DriverCard from "../../../components/user-panel/driver-booking-card"; // Import DriverCard
import { BiArrowBack } from "react-icons/bi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { BaseURL } from "../../../utils/BaseURL";

const DriverBooking = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [drivers, setDrivers] = useState([]); // Stores the driver data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [serverMessage, setServerMessage] = useState(""); // Server message

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Fetch drivers data from the API
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setLoading(true);
        setError(null);
        setServerMessage("");

        const response = await fetch(`${BaseURL}/auth/drivers/available`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODNmNTY1MzEzNTVjMDY5OGViZDE1OSIsInBob25lIjoiKzkyMDAwMDAiLCJyb2xlIjoidXNlciIsImlhdCI6MTczNjcwMTMwMCwiZXhwIjoxNzM3OTk3MzAwfQ.hy2U2MUxXhXpf5iIhxKzsBG71isJGm9JAs0GQCSL4vM", // Replace <your-token> with the actual token
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(`Error: ${response.status} ${response.statusText}`);
          setServerMessage(
            data.message || "An error occurred while fetching data."
          );
          setDrivers([]); // Clear the drivers if an error occurs
          return;
        }

        // Set the drivers data from the API response
        setDrivers(data.availableDrivers || []);
        setServerMessage(data.message || "Drivers fetched successfully.");
      } catch (err) {
        setError("An unexpected error occurred.");
        setServerMessage(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  // Show loading spinner while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full w-full">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="p-6">
        {/* Back Button */}
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center mb-4 hover:bg-gray-100 cursor-pointer py-2 px-3 rounded-[12px] w-fit">
            <BiArrowBack size={23} />
            <h1 className="text-lg font-semibold">Driver Booking</h1>
          </div>
          {/* Dropdown Button */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-between px-4 py-2 bg-purple-100 text-purple-500 rounded-full shadow-sm"
            >
              Options
              {isDropdownOpen ? (
                <FaChevronUp className="ml-2" />
              ) : (
                <FaChevronDown className="ml-2" />
              )}
            </button>
          </div>
        </div>

        {/* Show Server Message */}
        {serverMessage && (
          <div className="mb-4 p-3 rounded bg-blue-100 text-blue-700">
            {serverMessage}
          </div>
        )}

        {/* Show Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700">
            {error}
          </div>
        )}

        {/* Display Drivers */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center">
          {drivers.length > 0 ? (
            drivers.map((driver, index) => (
              <DriverCard
                key={index}
                id={driver._id}
                name={`${driver.firstName}`}
                rating={driver.reviews?.length || 0}
                price={driver.hourlyPrice || 0}
                availability={
                  driver.availability ? "Available" : "Not Available"
                }
                carTypes={driver.carCategory ? [driver.carCategory] : []}
                profilePicture={driver.profilePicture}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No drivers available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverBooking;
