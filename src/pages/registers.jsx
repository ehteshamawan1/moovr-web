import React, { useState } from "react";
import axios from "axios";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
    firstName: "",
    lastName: "",
    city: "",
    driverType: "",
    serviceType: "",
    carCategory: "",
    referralCode: "",
  });
  const [error, setError] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  // Dummy Token for API Authentication
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODNmNTY1MzEzNTVjMDY5OGViZDE1OSIsInBob25lIjoiKzkyMDAwMDAiLCJyb2xlIjoidXNlciIsImlhdCI6MTczNjcwMTMwMCwiZXhwIjoxNzM3OTk3MzAwfQ.hy2U2MUxXhXpf5iIhxKzsBG71isJGm9JAs0GQCSL4vM";

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Generate OTP and move to the next step
  const handleGenerateOtp = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous errors
    try {
      const response = await axios.post(
        "https://moovr-api.vercel.app/api/v1/auth/verify-phone",
        { phone: formData.phone },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const otp = response.data.otp; // Assuming the backend sends the OTP
      setGeneratedOtp(otp);
      console.log("Generated OTP:", otp); // Log OTP for debugging
      setStep(2); // Move to the next step
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        `Server Error: ${err.response?.status || "Unknown Error"}`;
      console.error("Error during OTP generation:", err.response || err.message);
      setError(errorMessage); // Show the error to the user
    }
  };

  // Verify OTP and move to the next step
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous errors
    try {
      const response = await axios.post(
        "https://moovr-api.vercel.app/api/v1/auth/verify-otp",
        {
          phone: formData.phone,
          otp: formData.otp,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("OTP Verified:", response.data);
      setStep(3); // Move to the registration step
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        `Server Error: ${err.response?.status || "Unknown Error"}`;
      console.error("Error during OTP verification:", err.response || err.message);
      setError(errorMessage); // Show the error to the user
    }
  };

  // Submit registration details
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous errors
    try {
      const response = await axios.post(
        "https://moovr-api.vercel.app/api/v1/auth/register",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Registration Successful:", response.data);
      alert("Registration completed successfully!");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        `Server Error: ${err.response?.status || "Unknown Error"}`;
      console.error("Error during registration:", err.response || err.message);
      setError(errorMessage); // Show the error to the user
    }
  };

  return (
    <div className="multi-step-form">
      {step === 1 && (
        <form onSubmit={handleGenerateOtp}>
          <h2>Step 1: Enter Phone Number</h2>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Generate OTP</button>
          {error && <p className="error">{error}</p>}
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp}>
          <h2>Step 2: Verify OTP</h2>
          <p>OTP has been sent to {formData.phone}. Please check your messages.</p>
          <div>
            <label>OTP:</label>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Verify OTP</button>
          {error && <p className="error">{error}</p>}
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleRegister}>
          <h2>Step 3: Driver Registration</h2>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Driver Type:</label>
            <input
              type="text"
              name="driverType"
              value={formData.driverType}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Service Type:</label>
            <input
              type="text"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Car Category:</label>
            <input
              type="text"
              name="carCategory"
              value={formData.carCategory}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Referral Code (Optional):</label>
            <input
              type="text"
              name="referralCode"
              value={formData.referralCode}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Register</button>
          {error && <p className="error">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default MultiStepForm;
