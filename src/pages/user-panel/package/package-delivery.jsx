import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import Header from "../../../components/user-panel/header";
import { Link } from "react-router-dom";

const PackageDelivery = () => {
  return (
    <div className="h-screen w-screen">
      {/* Header */}
      <Header />

      <div className="max-w-[1180px] mx-auto h-full flex flex-col p-6 md:p-12 xl:py-24">
        {/* Back Button */}
        <div className="flex items-center mb-4 cursor-pointer">
          <FaArrowLeft className="text-lg mr-2" />
          <span className="text-sm font-medium">Back</span>
        </div>

        {/* Content and Image Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Content Section */}
          <div className="text-start py-8 w-full md:max-w-[50%]">
            {/* Title and Description */}
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Delivering Happiness, On-Time, Every Time
            </h2>
            <p className="text-gray-500 mb-10">
              We prioritize your happiness with reliable, punctual service,
              ensuring every interaction brings joy and satisfaction.
            </p>

            {/* Buttons for Sending and Receiving Packages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to={"/package/pickup"}
                className="bg-purple-500 text-center hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-full"
              >
                Send a package
              </Link>
              <button className="bg-purple-100 text-purple-500 font-semibold py-3 px-6 rounded-full">
                Receive a package
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full max-w-[300px] mx-auto h-auto">
            <img
              src="/images/package-delivery.svg"
              alt="Package Delivery"
              className="object-cover h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDelivery;
