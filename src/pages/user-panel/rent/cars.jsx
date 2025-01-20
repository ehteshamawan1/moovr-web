import React, { useState, useEffect } from "react";
import Header from "../../../components/user-panel/header"; // Import your Header component
import { BiArrowBack } from "react-icons/bi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const RentCars = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All");
  const [priceValue, setPriceValue] = useState("");
  const [cars, setCars] = useState([]); // State to store fetched cars
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle error state

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  // Function to fetch cars from the API with token
  const fetchCars = async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODNmNTY1MzEzNTVjMDY5OGViZDE1OSIsInBob25lIjoiKzkyMDAwMDAiLCJyb2xlIjoidXNlciIsImlhdCI6MTczNjcwMTMwMCwiZXhwIjoxNzM3OTk3MzAwfQ.hy2U2MUxXhXpf5iIhxKzsBG71isJGm9JAs0GQCSL4vM";

    if (!token) {
      setError("No authentication token found");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BaseURL}/cars/list`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cars");
      }

      const data = await response.json();
      setCars(data.carListings); // Assuming the API response contains a 'carListings' array
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="h-full w-full">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="max-w-[1180px] mx-auto p-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center mb-4 hover:bg-gray-100 cursor-pointer py-2 px-3 rounded-[12px] w-fit">
            <BiArrowBack size={23} />
            <h1 className="text-lg font-semibold">Rent</h1>
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
                    <label>Price</label>
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

        {/* Loading and Error Handling */}
        {loading && <p>Loading cars...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Cars Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center">
          {cars.length === 0 && !loading && <p>No cars available</p>}
          {cars
            .filter((car) => {
              if (selectedOption === "All") return true;
              if (selectedOption === "Available")
                return car.status === "Available";
              return true;
            })
            .map((car) => (
              <Link to={`/rent/car/details/${car._id}`} key={car.id}>
                <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col cursor-pointer">
                  <img
                    src={car.image || "/images/default-car.png"}
                    alt={car.name}
                    className="w-full h-40 object-cover mb-4"
                  />
                  <h2 className="font-semibold text-lg text-gray-800">
                    {car.name}
                  </h2>
                  <div className="flex gap-2 pt-3 items-center">
                    <img src="/icons/ride/map-pin.svg" alt="Location icon" />
                    <p className="text-sm text-gray-500">{car.location}</p>
                  </div>
                  <div className="flex items-center justify-between w-full mt-2">
                    <div className="flex gap-2 items-center">
                      <img src="/icons/ride/seats.svg" alt="Seats icon" />
                      <p className="text-gray-700">{car.seats} seats</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <img src="/icons/ride/coins.svg" alt="Price icon" />
                      <p className="font-medium text-gray-900">
                        ₦{car.price}/h
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RentCars;
