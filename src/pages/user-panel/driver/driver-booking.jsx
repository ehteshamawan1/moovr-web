import React, { useState, useEffect } from "react";
import Header from "../../../components/user-panel/header"; // Import your Header component
import DriverCard from "../../../components/user-panel/driver-booking-card"; // Import DriverCard
import { BiArrowBack } from "react-icons/bi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const DriverBooking = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Available");
  const [priceValue, setPriceValue] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODNmNTY1MzEzNTVjMDY5OGViZDE1OSIsInBob25lIjoiKzkyMDAwMDAiLCJyb2xlIjoidXNlciIsImlhdCI6MTczNjcwMTMwMCwiZXhwIjoxNzM3OTk3MzAwfQ.hy2U2MUxXhXpf5iIhxKzsBG71isJGm9JAs0GQCSL4vM";

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://moovr-api.vercel.app/api/v1/bookings/user-bookings", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (!response.ok) {
          const text = await response.text();
          console.error("Error response body:", text);
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
    
        if (response.headers.get("content-type")?.includes("application/json")) {
          const data = await response.json();
          setBookings(data.bookings || []);
        } else {
          throw new Error("Unexpected content type received from API.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    

    fetchBookings();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="h-full w-full">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="max-w-[1180px] mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-3 items-center mb-4 hover:bg-gray-100 cursor-pointer py-2 px-3 rounded-[12px] w-fit">
            <BiArrowBack size={23} />
            <h1 className="text-lg font-semibold">Driver Booking</h1>
          </div>
          <div className="relative">
            {/* Dropdown Button */}
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-between px-4 py-2 bg-purple-100 text-purple-500 rounded-full shadow-sm"
            >
              {selectedOption}
              {isDropdownOpen ? (
                <FaChevronUp className="ml-2" />
              ) : (
                <FaChevronDown className="ml-2" />
              )}
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-12 right-0 w-56 bg-white shadow-lg rounded-lg mt-1 p-2">
                <ul className="flex flex-col">
                  <li
                    onClick={() => handleOptionSelect("All")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    All
                  </li>
                  <li
                    onClick={() => handleOptionSelect("Available")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Available
                  </li>
                  <li className="px-4 py-2 flex justify-between items-center gap-4">
                    <label className="">Price</label>
                    <input
                      type="text"
                      value={priceValue}
                      onChange={(e) => setPriceValue(e.target.value)}
                      placeholder="Price"
                      className="w-2/3 mt-1 px-2 py-1 bg-gray-100 rounded text-gray-500 focus:outline-none"
                    />
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
<<<<<<< HEAD

        {/* Bookings Section */}
        {loading ? (
          <p>Loading bookings...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center">
            {bookings.map((booking) => (
    <DriverCard
    key={booking._id}
    id={booking._id} // Pass the booking ID here
    name={booking.carName}
    rating={booking.driver.rating || 4.5} // Example rating
    price={booking.totalPrice}
    availability={booking.status}
    carTypes={["Suv", "Sedan"]} // Example car types
  />
            ))}
          </div>
        )}
=======
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center">
          {Array.from({ length: 12 }).map((_, index) => (
            <DriverCard
              key={index}
              name={drivers[index % drivers.length].name}
              rating={drivers[index % drivers.length].rating}
              price={drivers[index % drivers.length].price}
              availability={drivers[index % drivers.length].availability}
              carTypes={drivers[index % drivers.length].carTypes}
            />
          ))}
        </div>
>>>>>>> refs/remotes/origin/main
      </div>
    </div>
  );
};

export default DriverBooking;
