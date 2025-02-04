import { useState, useEffect } from "react";
import axios from "axios";
import {
  FiChevronDown,
  FiHome,
  FiGrid,
  FiCreditCard,
  FiList,
  FiCalendar,
  FiChevronRight,
} from "react-icons/fi";
import Header from "../../components/driver-panel/header";
import { BaseURL } from "../../utils/BaseURL";

export default function Bookings() {
  const [filter, setFilter] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [bookings, setBookings] = useState([]); // Ensure initial state is an array
  const [loading, setLoading] = useState(true);
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(new Date(date));
  };

  useEffect(() => {
    const driverData = JSON.parse(localStorage.getItem("userData"));
    const token = localStorage.getItem("token");
    const driverId = driverData ? driverData._id : null;
    console.log("Driver ID:", driverId); // Ensure ID is correctly retrieved

    if (driverId) {
      axios
        .get(`${BaseURL}/rent/rented-cars-by-driver/${driverId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        })
        .then((response) => {
          console.log("Response from API:", response);
          setBookings(
            Array.isArray(response.data.rentedCars)
              ? response.data.rentedCars
              : []
          ); // Ensure data is an array
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching rented cars:", error);
        });
    }
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-[#8257E9] bg-opacity-20 text-[#8257E9]";
      case "Completed":
        return "bg-[#8257E9] text-white";
      case "Cancelled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  const getActionButton = (status) => {
    switch (status) {
      case "Inactive":
        return (
          <button
            disabled
            className="px-6 py-4 bg-[#F3E9FE] cursor-not-allowed text-primaryPurple font-bold rounded-full transition-colors"
          >
            Cancel
          </button>
        );
      default:
        return (
          <button
            disabled
            className="px-6 py-4 bg-[#a38ade] font-bold text-white rounded-full cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
        );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Header />

      <main className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-medium">Bookings</h1>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-4 py-2 bg-[#8257E9] bg-opacity-10 rounded-full text-sm flex items-center gap-2"
            >
              {filter}
              <FiChevronDown
                className={`transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
                {["All", "Active", "Completed", "Cancelled"].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setFilter(status);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-9">
          {bookings
            .filter((booking) => filter === "All" || booking.status === filter)
            .map((booking) => (
              <div
                key={booking._id}
                className="bg-white border border-gray-300 shadow-md rounded-lg p-6 flex items-center justify-between"
              >
                <div className="grid grid-cols-2 items-center gap-6">
                  <div className="relative h-[250px] w-[250px] flex items-center">
                    <img
                      src={booking.image} // dynamic image from the API
                      alt={booking.vehicleName}
                      className="w-full h-auto object-contain rounded-lg"
                    />
                    <span
                      className={`px-3 py-1 absolute top-0 left-0 rounded-full text-sm font-medium ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-[600] text-[16px]">
                        {booking.make} {booking.model}
                      </h3>
                      <p className="text-lg font-medium">₦{booking.price}</p>
                    </div>

                    <p className="text-sm text-gray-500 text-[14px]">
                      {booking.description}
                    </p>
                    <p className="text-[16px] font-medium py-3">
                      {booking.rentalPeriods[0].deliveryLocation}
                    </p>
                    <p className="text-[12px] text-gray-500">
                      {formatDate(booking.rentalPeriods[0].startDate)} -{" "}
                      {formatDate(booking.rentalPeriods[0].endDate)}
                    </p>

                    <div className="flex flex-col pt-4 w-3/4 gap-4">
                      {getActionButton(booking.status)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
