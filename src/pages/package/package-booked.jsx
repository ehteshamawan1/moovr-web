import React from "react";
import Header from "../../components/header";
import { Link } from "react-router-dom";

const PackageBooked = () => {
  return (
    <div className="h-screen  w-screen ">
      {/* Header */}
      <Header />
      <div className=" bg-white flex flex-col items-center p-6 md:p-12">
        {/* Header Image */}
        <div className="w-full max-h-[470px] max-w-7xl mb-10 overflow-hidden rounded-lg">
          <img
            src="/images/package-booked-img.jpeg" // Replace with the actual image path
            alt="Package Delivery"
            className="w-full h-full object-cover "
          />
        </div>

        <div className="flex ">
          {/* Title and Description */}
          <div className="text-start mb-10 space-y-3 w-full md:w-2/5">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Get your package ready!
            </h2>
            <p className="text-gray-500 w-4/5 pb-5">
              Prepare your package for delivery by securely packing your items
              and labeling them clearly. Ensure all necessary documentation is
              included for a smooth shipping process.
            </p>
            {/* Track Button */}
            <Link to={"/package/track"}>
              <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-8 rounded-full">
                Track your package
              </button>
            </Link>
          </div>

          {/* Delivery Details */}
          <div className="w-full md:w-3/5 max-w-5xl flex justify-between items-center mb-12">
            <div className="text-left">
              <h3 className=" font-semibold mb-5">Delivery details</h3>
              <div className="">
                <p>4th Ave Abuja</p>
                <p className="text-sm text-gray-500">Pickup at 5:30PM</p>
              </div>
            </div>

            <img src="/icons/rent/connection.svg" alt="" />
            <div className="text-right mt-5">
              <p>Abuja Transcorp Hill Station</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageBooked;