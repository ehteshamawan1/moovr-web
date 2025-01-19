import React, { useState } from "react";
import {
  FaArrowLeft,
  FaEyeSlash,
  FaGoogle,
  FaApple,
  FaEye,
  FaCcMastercard,
} from "react-icons/fa"; // Icons for payment methods
import "../../App.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Header from "../../components/user-panel/header";

const Wallet = () => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("Google Pay");
  const [amount, setAmount] = useState("");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectMethod = (method) => {
    setSelectedMethod(method);
    setIsDropdownOpen(false);
  };

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <div className="h-screen  w-screen ">
      {/* Header */}
      <Header />
      <section className="max-w-[1180px] mx-auto p-6 md:p-12">
        {/* Back Button */}
        <div className="flex items-center mb-4 cursor-pointer">
          <FaArrowLeft className="text-lg mr-2" />
          <span className="text-sm font-medium">Wallet</span>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center  mb-8 space-y-6 md:space-y-0 md:space-x-6">
          {/* Wallet Balance Card */}
          <div className="card-gradient p-6 rounded-lg shadow-md w-full max-w-[370px] h-[180px] relative">
            <div className="flex justify-end items-center">
              <img
                src="/images/avatar.png" // Replace with the path to the user's avatar image
                alt="User Avatar"
                className="h-8 w-8 rounded-full"
              />
            </div>
            <div className="flex flex-col justify-end items-start">
              <h2 className="text-sm font-medium text-gray-500">
                Available balance
              </h2>
              <div className="my-2 flex items-center gap-3">
                <p className="text-3xl font-semibold text-gray-900">
                  {isBalanceVisible ? "₦1050" : "₦•••••"}
                </p>
                <div
                  onClick={toggleBalanceVisibility}
                  className="cursor-pointer"
                >
                  {isBalanceVisible ? (
                    <FaEyeSlash size={25} />
                  ) : (
                    <FaEye size={25} />
                  )}
                </div>
              </div>
              <div className="flex items-center text-gray-400">
                <span className="text-xs">
                  Tap to {isBalanceVisible ? "hide" : "show"} balance
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg flex flex-col justify-between shadow-md w-full h-[170px] max-w-[370px]">
            {/* Dropdown Selection */}
            <div
              onClick={toggleDropdown}
              className="flex items-center justify-between cursor-pointer"
            >
              <span className="text-sm font-semibold text-gray-800">
                {selectedMethod}
              </span>
              {isDropdownOpen ? (
                <IoIosArrowUp className="text-gray-600" />
              ) : (
                <IoIosArrowDown className="text-gray-600" />
              )}
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="mt-4 space-y-3">
                <div
                  onClick={() => selectMethod("Google Pay")}
                  className="flex items-center cursor-pointer space-x-2 hover:text-purple-600"
                >
                  <img
                    src="/icons/general/google.svg"
                    alt=""
                    className="h-auto w-6"
                  />
                  {/* <FaGoogle className="text-xl text-gray-600" /> */}
                  <span className="text-sm">Google Pay</span>
                </div>
                <div
                  onClick={() => selectMethod("Apple Pay")}
                  className="flex items-center cursor-pointer space-x-2 hover:text-purple-600"
                >
                  <img
                    src="/icons/general/apple-pay.svg"
                    alt=""
                    className="h-auto w-6"
                  />

                  {/* <FaApple className="text-xl text-gray-600" /> */}
                  <span className="text-sm">Apple Pay</span>
                </div>
                <div
                  onClick={() => selectMethod("Mastercard")}
                  className="flex items-center cursor-pointer space-x-2 hover:text-purple-600"
                >
                  <img
                    src="/icons/general/mastercard.svg"
                    alt=""
                    className="h-auto w-6"
                  />

                  {/* <FaCcMastercard className="text-xl text-gray-600" /> */}
                  <span className="text-sm">Mastercard</span>
                </div>
              </div>
            )}

            {/* Input Amount and Add Cash Button */}
            {!isDropdownOpen && (
              <div className="mt-6 flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-gray-200 rounded-full px-4 py-3 w-full text-sm text-gray-700 focus:outline-none"
                />
                <button
                  onClick={() =>
                    alert(`Added ${amount} with ${selectedMethod}`)
                  }
                  className="bg-purple-600 w-[40%] text-white px-4 py-3 rounded-full text-sm font-semibold hover:bg-purple-700"
                >
                  Add cash
                </button>
              </div>
            )}
          </div>
        </div>

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
      </section>
    </div>
  );
};

export default Wallet;
