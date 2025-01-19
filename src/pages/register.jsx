import React, { useState } from "react";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const Register = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (isValid, value, countryData) => {
    setPhoneNumber(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Phone Number:", phoneNumber);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-5xl h-[550px] grid md:grid-cols-2">
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
            <IntlTelInput
              preferredCountries={["ng", "us", "gb"]}
              defaultCountry={"ng"}
              containerClassName="intl-tel-input w-full"
              inputClassName="w-full border-2 border-gray-200 rounded-full p-2 focus:outline-none focus:bg-none hover:bg-none"
              fieldId="phoneNumber"
              onPhoneNumberChange={handlePhoneNumberChange}
            />
            <button
              type="submit"
              className="w-full py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600"
            >
              Continue
            </button>
          </form>
          <div className="text-center mt-4">
            <p>
              Don't have an account?{" "}
              <a href="#" className="text-purple-500">
                Sign up
              </a>
            </p>
          </div>
          <div className="flex items-center my-4">
            <hr className="flex-1" />
            <span className="px-4 text-gray-400">or</span>
            <hr className="flex-1" />
          </div>
          <div className="space-y-3">
            <button className="w-full py-2 border border-gray-300 rounded-full flex items-center justify-center space-x-2 hover:bg-gray-100">
              <img src="/icons/google.svg" alt="Google" className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>
            <button className="w-full py-2 border border-gray-300 rounded-full flex items-center justify-center space-x-2 hover:bg-gray-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/633px-Apple_logo_black.svg.png"
                alt="Apple"
                className="w-5 h-5"
              />
              <span>Continue with Apple</span>
            </button>
            <button className="w-full py-2 border border-gray-300 rounded-full flex items-center justify-center space-x-2 hover:bg-gray-100">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Facebook"
                className="w-5 h-5"
              />
              <span>Continue with Facebook</span>
            </button>
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

export default Register;
