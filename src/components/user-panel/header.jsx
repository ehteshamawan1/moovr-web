import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNav, setSelectedNav] = useState("Ride");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null); // User state to hold fetched data

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (navItem) => {
    setSelectedNav(navItem);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage
      try {
        const response = await axios.get(`${BaseURL}/auth/get-user`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
          },
        });

        setUser(response.data.user); // Set user data from the API
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array means this runs once on component mount

  return (
    <header className="flex items-center justify-between px-8 pb-5 pt-8 z-50 shadow-md bg-white">
      {/* Left Section - Logo */}
      <div className="flex items-center space-x-6">
        <img
          src="/images/logo.svg"
          alt="Logo"
          className="h-[40px] w-auto pr-8"
        />

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-9">
          {[
            { name: "Ride", link: "/ride" },
            { name: "Rent", link: "/rent/cars" },
            { name: "Driver", link: "/drivers" },
            { name: "Package", link: "/package" },
            { name: "Intercity Ride", link: "/reserve" },
            { name: "Bill", link: "/bill" },
            // { name: "More", link: "/carpool" },
          ].map((navItem) => (
            <Link
              key={navItem.name}
              to={navItem.link}
              onClick={() => handleNavClick(navItem.name)}
              className={`flex flex-col items-center justify-center ${
                selectedNav === navItem.name ? "text-gray-700" : "text-gray-700"
              }`}
            >
              <img
                src={`/icons/header/${navItem.name.toLowerCase()}.svg`}
                alt={navItem.name}
                className="w-5 h-5"
              />
              <span>{navItem.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="relative">
        {/* Profile Button */}
        <div className="flex items-center justify-center gap-3 md:gap-6">
          <Link to={"/wallet"}>
            <img src="/icons/header/wallet.svg" alt="" />
          </Link>
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <img
              src="/images/avatar.png"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div className="hidden md:flex items-center gap-2">
              <span className=" text-gray-700">
                {" "}
                {user?.firstName || user?.lastName || "Mr. Edmund"}
              </span>
              {isOpen ? (
                <FaChevronUp className="ml-1" />
              ) : (
                <FaChevronDown className="ml-1" />
              )}
            </div>
          </button>
          {/* Mobile Hamburger Menu */}
          <button
            onClick={toggleSidebar}
            className="md:hidden flex items-center space-x-2 text-gray-700"
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-50">
            <div className="p-4 border-b flex items-center space-x-2 justify-between">
              <div className="flex items-center space-x-2">
                <img
                  src="/images/avatar.png"
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <span className=" text-gray-700">
                  {" "}
                  {user?.firstName || user?.lastName || "Mr. Edmund"}
                </span>
              </div>
              <Link to={"/activity"}>
                <img src="/icons/header/pad.svg" alt="" />
              </Link>
            </div>
            <ul className="py-2">
              <Link
                to={"/settings"}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-4"
              >
                <img src="/icons/header/account.svg" alt="" />
                <span>Account settings</span>
              </Link>
              <Link
                to={"/languages"}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-4"
              >
                <img src="/icons/header/language.svg" alt="" />
                <span>Language</span>
              </Link>
              <Link
                to={"/privacy-policy"}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-4"
              >
                <img src="/icons/header/legal.svg" alt="" />
                <span>Legal</span>
              </Link>
              <Link
                to={"/"}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-4"
              >
                <img src="/icons/header/logout.svg" alt="" />
                <span>Log out</span>
              </Link>
            </ul>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity duration-300 ease-in-out ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>
      <div
        className={`fixed right-0 top-0 w-64 z-[1000] bg-white h-full shadow-lg transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end items-center pr-8 py-10">
          <button onClick={toggleSidebar}>
            <FaTimes size={24} />
          </button>
        </div>

        <nav className="space-y-6 px-4 py-8">
          {[
            { name: "Ride", link: "/ride" },
            { name: "Rent", link: "/rent/cars" },
            { name: "Driver", link: "/drivers" },
            { name: "Package", link: "/package" },
            { name: "Intercity Ride", link: "/reserve" },
            { name: "Bill", link: "/bill" },
            // { name: "More", link: "/carpool" },
          ].map((navItem) => (
            <Link
              key={navItem.name}
              to={navItem.link}
              onClick={() => handleNavClick(navItem.name)}
              className={`flex items-center space-x-4 px-4 py-2 text-gray-700 hover:bg-gray-100`}
            >
              <img
                src={`/icons/header/${navItem.name.toLowerCase()}.svg`}
                alt={navItem.name}
                className="w-5 h-5"
              />
              <span>{navItem.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
