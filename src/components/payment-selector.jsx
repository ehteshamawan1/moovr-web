import React, { useState } from "react";

const PaymentSelector = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("Debit Card");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectPayment = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-80 flex flex-col items-center gap-3">
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={toggleDropdown}
      >
        {selectedPayment === "MoovR Wallet" && (
          <img
            src="/images/wallet-icon.png"
            alt="MoovR Wallet"
            className="w-8 h-8"
          />
        )}
        {selectedPayment === "Cash" && (
          <img src="/images/cash-icon.png" alt="Cash" className="w-8 h-8" />
        )}
        {selectedPayment === "Debit Card" && (
          <img
            src="/images/mastercard.svg"
            alt="Debit Card"
            className="w-8 h-8"
          />
        )}
        <span className="font-semibold">{selectedPayment}</span>
        <img
          src="/images/chevron-down-icon.png"
          alt="Expand"
          className={`w-4 h-4 transform ${
            isDropdownOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {isDropdownOpen && (
        <div className="bg-white w-full rounded-lg shadow-lg mt-2">
          <ul className="flex flex-col">
            <li
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectPayment("MoovR Wallet")}
            >
              <img
                src="/icons/wallet.svg"
                alt="MoovR Wallet"
                className="w-6 h-6 mr-3"
              />
              <span>MoovR Wallet</span>
            </li>
            <li
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectPayment("Cash")}
            >
              <img
                src="/images/cash-icon.png"
                alt="Cash"
                className="w-6 h-6 mr-3"
              />
              <span>Cash</span>
            </li>
            <li
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectPayment("Debit Card")}
            >
              <img
                src="/images/mastercard.svg"
                alt="Debit Card"
                className="w-6 h-6 mr-3"
              />
              <span>Debit Card</span>
            </li>
          </ul>
        </div>
      )}

      <button className="bg-purple-500 w-full text-white py-2 px-4 rounded-full text-sm font-semibold hover:bg-purple-600">
        Select MoovR
      </button>
    </div>
  );
};

export default PaymentSelector;
