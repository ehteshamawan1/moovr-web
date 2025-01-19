import React from "react";
import Header from "../../../components/user-panel/header"; // Import your Header component
import { FaArrowLeft, FaMapMarkerAlt } from "react-icons/fa"; // For the map marker icon
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

const ConfirmPickup = () => {
  return (
    <div className="h-screen w-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className=" relative h-full">
        {/* Map Background */}
        <div className="absolute inset-0">
          <img
            title="Map"
            src="/images/full-map-img.png"
            alt="Map"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-[1180px] mx-auto">
          {/* Floating Card for Pickup Selection */}
          <div className=" absolute top-[10%] left-[10%] transform md:w-[400px]  space-y-4 w-[80%] ">
            {/* Search Input */}

            {/* Back Button */}
            <Link
              to={"/package"}
              className="flex items-center mb-20 cursor-pointer"
            >
              <FaArrowLeft className="text-lg mr-2" />
              <span className="text-sm font-medium">Back</span>
            </Link>
            <div className="relative mb-4">
              <IoSearch
                className="absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-600"
                size={20}
              />
              <input
                type="text"
                placeholder="Select pickup point"
                className="w-full pl-12 px-6 py-4 border rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className=" p-4 md:p-7 bg-white rounded-lg shadow-lg">
              <div className=" text-lg font-semibold">Choose pickup point</div>

              {/* Instruction Text */}
              <div className="text-sm text-start text-gray-500 my-2 pb-4">
                Drag map to adjust
              </div>

              {/* Confirm Button */}
              <Link
                to={"/package/delivery"}
                className="w-full py-3 flex justify-center rounded-full bg-purple-500 text-white font-semibold hover:bg-purple-600"
              >
                Confirm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPickup;
