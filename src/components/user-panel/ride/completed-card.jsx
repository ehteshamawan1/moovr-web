import React from "react";
import { Link } from "react-router-dom";

const CompletedCard = ({ title, path }) => {
  return (
    <div className=" bg-white rounded-2xl shadow-lg p-8 w-96 text-center">
      <h2 className="font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="flex justify-center mb-6">
        <div className="flex items-center justify-center">
          <img
            src="/images/check.png" // Replace with your checkmark icon
            alt="Checkmark"
          />
        </div>
      </div>
      <Link to={path}>
        <button className="bg-purple-500 text-white py-3 w-full rounded-full text-lg font-semibold hover:bg-purple-600">
          Get another Ride
        </button>
      </Link>
    </div>
  );
};

export default CompletedCard;
