import React, { useState, useEffect } from "react";
import Header from "../../../components/user-panel/header";
import { BiArrowBack } from "react-icons/bi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BaseURL } from "../../../utils/BaseURL";

const CarDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the car ID from the URL parameters
  const [carDetails, setCarDetails] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("Debit Card");

  // Fetch car details using the ID from the API
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`${BaseURL}/cars/list/${id}`);
        const data = await response.json();
        if (data) {
          setCarDetails(data);
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    if (id) {
      fetchCarDetails();
    }
  }, [id]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectPayment = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
    setIsDropdownOpen(false);
  };

  if (!carDetails) {
    return <div>Loading...</div>; // Display loading state while fetching car details
  }

  return (
    <div className="h-screen w-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="max-w-[1180px] mx-auto p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex gap-3 items-center mb-8 cursor-pointer py-2 px-3 rounded-[12px] w-fit hover:bg-gray-100"
        >
          <BiArrowBack size={23} /> Back
        </button>

        {/* Car Image Section */}
        <div className="flex justify-center mb-12">
          <div className="relative w-[600px]">
            {/* Dynamically fetch the car image */}
            <img
              src={carDetails.image || "/images/BMW.png"} // Fallback if imageUrl is not available
              alt="Car"
              className="w-[85%] h-auto object-contain"
            />
            <div className="absolute w-full bottom-[10px] left-1/2 transform -translate-x-1/2">
              <img src="/images/car-surface.svg" alt="" />
            </div>
          </div>
        </div>

        {/* Rental Price Section */}
        <div className="bg-white rounded-2xl border-[1.4px] border-gray-200 shadow-md p-6 flex justify-between items-center">
          <div className="relative w-1/3">
            <div
              className="px-4 py-3 space-y-4 bg-white cursor-pointer"
              onClick={toggleDropdown}
            >
              <div className="flex justify-between">
                <h3 className="text-[16px] text-primaryGray">Rental Price</h3>
                <span className="flex items-end gap-[.5px]">
                  <p className="text-[13px] text-primaryGray mb-1 font-bold">
                    ₦
                  </p>
                  <p className="text-[20px] text-primaryGray font-bold">
                    {carDetails.price}
                  </p>
                  <p className="text-[10px] text-primaryGray/50 mb-1">/hour</p>
                </span>
              </div>
            </div>
          </div>

          {/* Dropdown for payment selection */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="px-4 py-2 bg-gray-100 text-sm rounded-full flex items-center gap-2"
            >
              {selectedPayment} <FaChevronDown />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-12 right-0 bg-white shadow-md rounded-md border border-gray-200">
                {["Debit Card", "Credit Card", "PayPal"].map(
                  (paymentMethod) => (
                    <button
                      key={paymentMethod}
                      onClick={() => handleSelectPayment(paymentMethod)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      {paymentMethod}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        {/* Rent a Car Button */}
        <Link
          to={`/rent/car/confirm/${id}`}
          className="bg-purple-500 flex justify-center text-white py-3 px-12 rounded-full w-1/3 text-lg font-medium hover:bg-purple-600 mt-6"
        >
          Rent a Car
        </Link>
      </div>
    </div>
  );
};

export default CarDetail;
