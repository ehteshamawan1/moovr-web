import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import Header from "../../../components/user-panel/header";
import { Link } from "react-router-dom";

const Bill = () => {
  const bills = [
    {
      id: 1,
      type: "Trip",
      date: "05/09/2024",
      price: 256,
      rating: 5,
      mapSrc: "bill.png",
    },
    {
      id: 2,
      type: "Package",
      date: "05/09/2024",
      price: 256,
      rating: 5,
      mapSrc: "bill.png",
    },
    {
      id: 3,
      type: "Trip",
      date: "05/09/2024",
      price: 256,
      rating: 5,
      mapSrc: "bill.png",
    },
    {
      id: 4,
      type: "Package",
      date: "05/09/2024",
      price: 256,
      rating: 5,
      mapSrc: "bill.png",
    },
    {
      id: 5,
      type: "Trip",
      date: "05/09/2024",
      price: 256,
      rating: 5,
      mapSrc: "bill.png",
    },
    {
      id: 6,
      type: "Trip",
      date: "05/09/2024",
      price: 256,
      rating: 5,
      mapSrc: "bill.png",
    },
  ];

  return (
    <div className="h-screen w-screen overflow-x-hidden">
      {/* Header */}
      <Header />

      <div className="max-w-[1180px] mx-auto p-6 md:p-12">
        {/* Back Button */}
        <div className="flex items-center mb-4 cursor-pointer">
          <FaArrowLeft className="text-lg mr-2" />
          <span className="text-sm font-medium">Package delivery</span>
        </div>
        <div className="p-4">
          <div className="text-lg font-bold mb-4">Your Bills</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bills.map((bill) => (
              <Link
                to={"/bill/details"}
                key={bill.id}
                className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <div className="relative">
                  <img
                    src={`/images/${bill.mapSrc}`}
                    alt={`${bill.type} Map`}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-[#E9D6FE] px-3 py-1 text-[16px] rounded-full">
                    {bill.type}
                  </div>
                </div>
                <div className="flex justify-between items-end p-3">
                  <div className="text-[16px] font-bold">{bill.date}</div>
                  <div>
                    <div className="text-[12px] font-bold text-gray-800 ">
                      ₦ <span className="text-[16px]">{bill.price}</span>
                    </div>
                    <div className="text-yellow-500 text-lg mt-1">
                      {"★".repeat(bill.rating)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bill;
