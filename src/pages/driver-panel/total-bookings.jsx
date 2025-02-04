"use client";

import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Header from "../../components/driver-panel/header";
import axios from "axios";
import { BaseURL } from "../../utils/BaseURL";

const Card = ({ children, className = "", ...props }) => (
  <div className={`bg-white rounded-lg shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

export default function TotalBookings() {
  const [selectedOption, setSelectedOption] = useState("This Month");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [recentListings, setRecentListings] = useState([]);
  const [totalBookings, setTotalBookings] = useState(0);
  const [listingData, setListingData] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const driverId = userData?._id;

        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `${BaseURL}/rent/rented-cars-by-driver/${driverId}`, // Adjust API if needed
          config
        );

        const rentedCars = response.data.rentedCars || [];
        setTotalBookings(rentedCars.length);

        const activeListings = rentedCars.filter(
          (car) => car.status === "active"
        );
        const inactiveListings = rentedCars.filter(
          (car) => car.status === "inactive"
        );
        const removedListings = rentedCars.filter(
          (car) => car.status === "removed"
        );

        setListingData([
          {
            name: "Active",
            value: activeListings.length,
            color: "#8B5CF6",
            bgColor: "#EDE9FE",
          },
          {
            name: "Inactive",
            value: inactiveListings.length,
            color: "#4C1D95",
            bgColor: "#F3E8FF",
          },
          {
            name: "Removed",
            value: removedListings.length,
            color: "#EF4444",
            bgColor: "#FEE2E2",
          },
        ]);

        setRecentListings(rentedCars);
      } catch (error) {
        console.error("Error fetching bookings data:", error);
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
    <div className="w-full min-h-screen">
      {/* Header */}
      <Header />

      <div className="p-6 max-w-6xl mx-auto">
        {/* Listing Stats */}
        <Card className="p-6 ">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total Bookings</h2>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center px-4 py-2 bg-purple-100 text-purple-500 rounded-full shadow-sm"
              >
                {selectedOption}
                {isDropdownOpen ? (
                  <FaChevronUp className="ml-2" />
                ) : (
                  <FaChevronDown className="ml-2" />
                )}
              </button>
              {isDropdownOpen && (
                <div className="absolute top-12 right-0 w-40 bg-white shadow-lg rounded-lg mt-1">
                  <ul>
                    <li
                      onClick={() => handleOptionSelect("This Month")}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      This Month
                    </li>
                    <li
                      onClick={() => handleOptionSelect("Last Month")}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Last Month
                    </li>
                    <li
                      onClick={() => handleOptionSelect("This Year")}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      This Year
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="flex shadow-md justify-center items-center space-x-10 py-10 mt-8">
            {listingData.map((data, index) => (
              <div key={index} className="text-center">
                <ResponsiveContainer width={200} height={200}>
                  <PieChart>
                    <Pie
                      data={[
                        { value: data.value, color: data.color },
                        {
                          value: totalBookings - data.value,
                          color: data.bgColor,
                        },
                      ]}
                      dataKey="value"
                      outerRadius={80}
                      innerRadius={60}
                      startAngle={90}
                      endAngle={450}
                      isAnimationActive={true}
                    >
                      <Cell key="value" fill={data.color} />
                      <Cell key="bg" fill={data.bgColor} />
                    </Pie>
                    <text
                      x="50%"
                      y="45%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-lg font-bold"
                    >
                      {data.name}
                    </text>
                    <text
                      x="50%"
                      y="55%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-xl mt-2 font-medium text-gray-700"
                    >
                      {data.value}
                    </text>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>
        </Card>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Listings
          </h3>
          <div className="space-y-4">
            {recentListings.length > 0 ? (
              recentListings.map((listing) => (
                <div
                  key={listing._id} // Use the unique car listing _id as key
                  className="flex shadow-md border rounded-md border-gray-50 items-center justify-between p-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-auto h-12">
                      <img
                        src={listing.image || "/images/BMW.png"} // Default image if none is provided
                        alt={listing.vehicleName}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{listing.vehicleName}</p>
                      <p className="text-sm text-gray-500">{`${listing.make} ${listing.model}`}</p>
                      <p className="text-sm text-gray-500">
                        Price: ${listing.price}
                      </p>
                    </div>
                  </div>

                  {/* Rental Periods */}
                  <div className="space-y-2">
                    {listing.rentalPeriods.map((rental, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        <p>
                          Start Date:{" "}
                          {new Date(rental.startDate).toLocaleDateString()}
                        </p>
                        <p>
                          End Date:{" "}
                          {new Date(rental.endDate).toLocaleDateString()}
                        </p>
                        <p>Delivery Location: {rental.deliveryLocation}</p>
                      </div>
                    ))}
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      listing.isAvailable
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {listing.isAvailable ? "Available" : "Not Available"}
                  </span>
                </div>
              ))
            ) : (
              <p>No recent bookings available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
