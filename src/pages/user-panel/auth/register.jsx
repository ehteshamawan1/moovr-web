import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BaseURL } from "../../../utils/BaseURL";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";

const Register = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  // Handle phone number changes and submission
  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BaseURL}/v1/auth/verify-phone`,
        {
          phone: `+${phoneNumber}`,
          role: "user",
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        toast.success("OTP requested successfully!");
        localStorage.setItem("userData", JSON.stringify({ phone: phoneNumber }));
        navigate("/verification");
      } else {
        toast.error("Unexpected response. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Error requesting OTP. Please try again.";
      toast.error(errorMessage);
      console.error("Error requesting OTP:", error);
    }
  };

  // Handle Google sign-in success
  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google Credential Response:", credentialResponse);
    toast.success("Google sign-in successful!");
    localStorage.setItem(
      "userData",
      JSON.stringify({ token: credentialResponse.credential })
    );
    navigate("/verification");
  };

  // Handle Google sign-in failure
  const handleGoogleError = () => {
    toast.error("Google sign-in failed. Please try again.");
  };

  // Handle Facebook login response
  const handleFacebookResponse = (response) => {
    console.log("Facebook Response:", response);
    // If login was successful, response will include an accessToken and userID.
    if (response.accessToken) {
      toast.success("Facebook login successful!");
      localStorage.setItem("userData", JSON.stringify(response));
      navigate("/verification");
    } else {
      toast.error("Facebook login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white lg:shadow-lg rounded-lg overflow-hidden max-w-5xl h-[550px] grid md:grid-cols-2">
        <div className="hidden md:block">
          <img
            src="/Singup-BG.jpg"
            alt="Login Graphic"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="p-8 w-96 mx-auto">
          <h2 className="text-2xl font-bold mb-4">Enter your mobile number</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <PhoneInput
              country={"ng"}
              preferredCountries={["ng", "us", "gb"]}
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              inputClass="w-full border-2 border-gray-200 rounded-full p-2 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full py-2 mt-3 bg-purple-500 text-white rounded-full hover:bg-purple-600"
            >
              Continue
            </button>
          </form>
          <div className="text-center mt-4">
            <p>
              Already have an account?{" "}
              <Link to={"/login"} className="text-purple-500">
                Log In
              </Link>
            </p>
          </div>
          <div className="flex items-center my-4">
            <hr className="flex-1" />
            <span className="px-4 text-gray-400">or</span>
            <hr className="flex-1" />
          </div>
          <div className="space-y-3">
            {/* <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap={false}
            />

            <FacebookLogin
              appId="10058219200861806"
              autoLoad={false}
              fields="name,email,picture"
              callback={handleFacebookResponse}
              cssClass="w-full py-2 border border-gray-300 rounded-full flex items-center justify-center space-x-2 hover:bg-gray-100"
              icon="fa-facebook"
              textButton="Continue with Facebook"
            />

            <button className="w-full py-2 border border-gray-300 rounded-full flex items-center justify-center space-x-2 hover:bg-gray-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/633px-Apple_logo_black.svg.png"
                alt="Apple"
                className="w-5 h-5"
              />
              <span>Continue with Apple</span>
            </button> */}
          </div>
          <p className="text-xs text-gray-500 mt-4">
            By proceeding, you consent to get calls, WhatsApp or SMS messages,
            including by automated dialer, from MovoR and its affiliates to the
            number provided. Text "STOP" to 67890 to opt out.
          </p>
        </div>
      </div>
    </div>
  );
};

// Wrap the Register component with the GoogleOAuthProvider to initialize the Google OAuth library.
const RegisterWithGoogle = () => {
  return (
    <GoogleOAuthProvider clientId="AIzaSyAxrweU7V8o6GsAENP-zXUPpBalFrfztS0">
      <Register />
    </GoogleOAuthProvider>
  );
};

export default RegisterWithGoogle;
