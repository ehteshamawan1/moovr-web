"use client";

import React, { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { FaChevronDown } from "react-icons/fa";
import Header from "../../components/driver-panel/header";
// Sample data for the area chart
const data = [
  { day: "Sun", value: 30 },
  { day: "Mon", value: 40 },
  { day: "Tue", value: 35 },
  { day: "Wed", value: 45 },
  { day: "Thu", value: 40 },
  { day: "Fri", value: 50 },
  { day: "Sat", value: 35 },
  { day: "Sun", value: 45 },
  { day: "Mon", value: 40 },
  { day: "Tue", value: 55 },
  { day: "Wed", value: 45 },
  { day: "Thu", value: 40 },
  { day: "Fri", value: 30 },
  { day: "Sat", value: 45 },
];

// Sample data for recent rides
const recentRides = [
  { id: 1, date: "01/05/2024", amount: 50 },
  { id: 2, date: "01/05/2024", amount: 50 },
  { id: 3, date: "01/05/2024", amount: 50 },
];

const Button = ({ children, className = "", ...props }) => (
  <button className={`px-4 py-2 rounded-md ${className}`} {...props}>
    {children}
  </button>
);

const Card = ({ children, className = "", ...props }) => (
  <div className={`bg-white rounded-lg shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

export default function Revenue() {
  const [selectedOption, setSelectedOption] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [priceValue, setPriceValue] = useState("");

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

      {/* Revenue Card */}
      <div className="p-6 max-w-6xl mx-auto">
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Total Revenue</h2>
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
          <div className=" h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <XAxis
                  dataKey="day"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={0}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                  tickMargin={0}
                />
                <defs>
                  <linearGradient
                    id="colorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#C084FC" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#C084FC" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  fill="url(#colorGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Transactions */}
        <div>
          <h3 className="text-lg text-start font-[600] text-gray-800 mt-4 my-4">
            Recent Transactions
          </h3>
          <div className="space-y-4">
            {[
              {
                type: "Payout for a ride",
                time: "9:54AM",
                amount: "-₦10",
                color: "text-red-500",
              },
              {
                type: "Payout for a ride",
                time: "2:30PM",
                amount: "-₦100",
                color: "text-red-500",
              },
              {
                type: "Cash added",
                time: "05/09/2024",
                amount: "+₦50",
                color: "text-green-500",
              },
              {
                type: "Payout for a ride",
                time: "05/09/2024",
                amount: "-₦100",
                color: "text-red-500",
              },
            ].map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-7 bg-gray-50 rounded-lg shadow-md"
              >
                <div className="flex items-center space-x-2">
                  <div>
                    <p className="text-sm font-medium">{transaction.type}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">{transaction.time}</p>
                <span className={`text-sm font-semibold ${transaction.color}`}>
                  {transaction.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
