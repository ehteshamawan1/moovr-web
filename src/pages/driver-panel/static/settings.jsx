import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import Header from "../../../components/driver-panel/header";
import AccountDetailsModal from "../../../components/user-panel/settings/account-details-modal";
import { Link, useNavigate } from "react-router-dom";

const DriverSettings = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailAlertsEnabled, setEmailAlertsEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const toggleNotifications = () =>
    setNotificationsEnabled(!notificationsEnabled);
  const toggleEmailAlerts = () => setEmailAlertsEnabled(!emailAlertsEnabled);

  return (
    <div className="text-start text-gray-700">
      <Header />
      <div className="p-4 sm:p-6 max-w-5xl mx-auto dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen">
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="flex gap-3 items-center mb-6 sm:mb-8 cursor-pointer py-2 px-3 rounded-[12px] w-fit hover:bg-gray-100"
        >
          <BiArrowBack size={23} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 lg:gap-24 justify-center">
          <div>
            {/* Profile Section */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
              <img
                src="/images/avatar.png"
                alt="Profile"
                className="h-24 w-24 sm:h-[120px] sm:w-[120px] border border-black rounded-full object-cover"
              />
              <div className="flex flex-col items-center sm:items-start text-center sm:text-start">
                <h2 className="text-lg sm:text-2xl font-semibold">
                  Mr. Edmund
                </h2>
                <p className="text-sm text-gray-500">+234xxxxxxxxxx</p>
                <button className="text-primaryPurple text-sm underline mt-2">
                  Change password
                </button>
              </div>
            </div>

            {/* Account Details */}
            <div className="mb-6 sm:mb-8 space-y-3 text-sm sm:text-base">
              <div className="flex justify-between mb-4 sm:mb-6 items-center">
                <h3 className="font-semibold">Account details</h3>
                <button onClick={() => setIsModalOpen(true)}>
                  <img src="/icons/settings/edit.svg" alt="" />
                </button>
              </div>
              {["Name", "Phone", "Email"].map((label, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row gap-2 sm:gap-5 items-center"
                >
                  <p className="w-full sm:w-auto text-gray-700">{label}</p>
                  <input
                    type={
                      label === "Email"
                        ? "email"
                        : label === "Phone"
                        ? "number"
                        : "text"
                    }
                    placeholder={
                      label === "Name"
                        ? "Mr. Edmond"
                        : label === "Phone"
                        ? "+230 *******"
                        : "Edmund1235@gmail.com"
                    }
                    className="focus:outline-none w-full sm:w-auto"
                  />
                </div>
              ))}
            </div>

            {/* Language */}
            <div className="mb-6 sm:mb-8 space-y-3 text-sm sm:text-base">
              <div className="flex justify-between mb-4 sm:mb-6 items-center">
                <h3 className="font-semibold">Language</h3>
                <Link to="/languages">
                  <button>
                    <img src="/icons/settings/edit.svg" alt="" />
                  </button>
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 justify-between items-center">
                <p>Current language of App.</p>
                <input
                  type="text"
                  placeholder="English"
                  className="focus:outline-none w-full sm:w-auto"
                />
              </div>
            </div>
          </div>

          <div>
            {/* Theme */}
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <h3 className="font-semibold">Theme</h3>
              <button
                onClick={toggleTheme}
                className={`w-12 h-6 rounded-full flex items-center px-1 ${
                  theme === "light" ? "bg-gray-200" : "bg-gray-700"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transform ${
                    theme === "dark" && "translate-x-6"
                  }`}
                />
              </button>
            </div>

            {/* Notifications */}
            <div className="mb-6 sm:mb-8">
              <h3 className="font-semibold">Notifications</h3>
              {[
                {
                  label: "Enable notifications",
                  state: notificationsEnabled,
                  toggle: toggleNotifications,
                },
                {
                  label: "Email alerts",
                  state: emailAlertsEnabled,
                  toggle: toggleEmailAlerts,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center mt-4"
                >
                  <span>{item.label}</span>
                  <button
                    onClick={item.toggle}
                    className={`w-12 h-6 rounded-full flex items-center px-1 ${
                      item.state ? "bg-purple-600" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transform ${
                        item.state && "translate-x-6"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Support and Feedback */}
            <div className="mb-6 sm:mb-8">
              <h3 className="font-semibold">Support and feedback</h3>
              <div className="flex flex-col gap-2 mt-4">
                {[
                  { label: "Contact support", action: "Contact" },
                  { label: "Report an issue", action: "Report" },
                  { label: "Submit a feedback", action: "Submit" },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{item.label}</span>
                    <button className="text-purple-600">{item.action}</button>
                  </div>
                ))}
              </div>
            </div>

            {/* App Version */}
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <h3 className="font-semibold">App version</h3>
              <span>Version 2.0.13</span>
            </div>

            {/* Delete Account */}
            <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-start">
              <div>
                <h3 className="font-semibold">Delete account?</h3>
                <p className="text-sm text-gray-500">
                  Do you want to delete your account permanently?
                </p>
              </div>
              <button className="mt-4 sm:mt-0 text-primaryPurple px-6 py-2 rounded-full bg-lightPurple text-sm sm:text-base font-semibold">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && <AccountDetailsModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default DriverSettings;
