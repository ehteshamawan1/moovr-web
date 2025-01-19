import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BaseURL } from "../../../utils/BaseURL";

const Verification = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(57);
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  // Handle input changes for each digit
  const handleChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value.slice(0, 1); // Ensure only one character
    setCode(newCode);

    // Focus the next input automatically
    if (e.target.value && index < 3) {
      document.getElementById(`digit-${index + 1}`).focus();
    }
  };

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [resendTimer]);

  useEffect(() => {
    // Get userData from localStorage and extract the phone number
    const userData = JSON.parse(localStorage.getItem("userData"));
    const number = userData?.phone || "";
    setPhoneNumber(number);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");

    if (!phoneNumber) {
      toast.error("Phone number not found in localStorage.");
      return;
    }

    try {
      const response = await axios.post(
        `${BaseURL}/v1/auth/verify-otp`,
        { otp: verificationCode, phone: `+${phoneNumber}` },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        toast.success("OTP verified successfully!");

        const { token } = response.data;
        console.log(response);
        if (token) {
          localStorage.setItem("token", token);
          navigate("/ride");
        } else {
          navigate("/name");
        }
      } else {
        toast.error("Unexpected response. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Error verifying OTP. Please try again.";

      toast.error(errorMessage);
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-8 text-center">
        <img
          src="/images/logo.svg"
          alt="Logo"
          className="mx-auto mb-6 w-20 h-20"
        />
        <h2 className="text-lg font-semibold mb-4">
          Enter the 4 digit code sent to you at +{phoneNumber}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center space-x-4">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                id={`digit-${index}`}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                className="w-16 h-16 text-center text-2xl border rounded-lg focus:outline-none focus:border-purple-500"
                maxLength="1"
              />
            ))}
          </div>
          <div className="text-sm text-gray-500">
            Resend code{" "}
            {resendTimer > 0 ? (
              <span className="text-gray-700">{`0:${
                resendTimer < 10 ? `0${resendTimer}` : resendTimer
              }`}</span>
            ) : (
              <button
                type="button"
                className="text-purple-500"
                onClick={() => setResendTimer(57)}
              >
                Resend
              </button>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-3 bg-purple-500 text-white rounded-full text-lg hover:bg-purple-600"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verification;
