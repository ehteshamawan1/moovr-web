"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody } from "@nextui-org/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Users, Car, DollarSign } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Avatar } from "@nextui-org/avatar";

// Static data for dashboard elements (stats, charts, recent users, etc.)
const stats = [
  {
    title: "Total Passengers",
    value: "828",
    icon: Users,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    title: "Total Cab",
    value: "537",
    icon: Car,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-500",
  },
  {
    title: "Today's Earning",
    value: "$ 48.81",
    icon: DollarSign,
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-500",
  },
  {
    title: "Total Earning",
    value: "$ 68291.01",
    icon: DollarSign,
    bgColor: "bg-green-50",
    iconColor: "text-green-500",
  },
];

const bookingData = [
  { month: "JAN", amount: 15000 },
  { month: "FEB", amount: 13500 },
  { month: "MAR", amount: 7000 },
  { month: "APR", amount: 1000 },
  { month: "MAY", amount: 500 },
  { month: "JUN", amount: 400 },
  { month: "JUL", amount: 400 },
  { month: "AUG", amount: 400 },
  { month: "SEP", amount: 400 },
  { month: "OCT", amount: 400 },
  { month: "NOV", amount: 400 },
  { month: "DEC", amount: 400 },
];

const recentUsers = [
  {
    name: "pankaj",
    time: "10:54 AM",
    date: "05 February 2025",
  },
  {
    name: "ssp",
    time: "8:59 AM",
    date: "05 February 2025",
  },
  {
    name: "Alexis G",
    time: "11:15 PM",
    date: "04 February 2025",
  },
];

const userData = [
  { name: "User", value: 60, color: "#00B5FF" },
  { name: "Driver", value: 40, color: "#FF8C00" },
];

export default function DashboardPage() {
  // Hard-code the user type. Change to "driver" if needed.
  const userType = "user";

  // State to store past bookings fetched from the API
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingsError, setBookingsError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Choose the appropriate endpoint based on the user type.
        const endpoint =
          userType === "driver"
            ? "https://moovr-api.vercel.app/past-driver-bookings"
            : "https://moovr-api.vercel.app/api/v1/past-user-bookings";
        const response = await axios.get(endpoint);
        // Assuming the API returns an object with a "bookings" key.
        setBookings(response.data.bookings);
      } catch (error) {
        setBookingsError("Failed to fetch past bookings");
      } finally {
        setBookingsLoading(false);
      }
    };

    fetchBookings();
  }, [userType]);

  return (
    <div className="p-6 space-y-6 bg-gray-50/50">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-none shadow-sm">
            <CardBody className="flex flex-row items-center gap-4">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`${stat.iconColor}`} size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Total Booking Chart */}
        <Card className="lg:col-span-3 border-none shadow-sm">
          <CardBody>
            <h3 className="text-xl font-semibold mb-4">Total Booking</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={bookingData}>
                  <defs>
                    <linearGradient
                      id="colorAmount"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#FFA500" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#FFA500" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#FFA500"
                    fillOpacity={1}
                    fill="url(#colorAmount)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        {/* Total Users Donut */}
        <Card className="border-none shadow-sm">
          <CardBody>
            <h3 className="text-xl font-semibold mb-4">Total Users</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={0}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {userData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Legend
                    verticalAlign="middle"
                    align="right"
                    layout="vertical"
                    iconType="circle"
                    iconSize={8}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Recent Bookings */}
        <Card className="lg:col-span-3 border-none shadow-sm">
          <CardBody>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Recent Bookings</h3>
              <button className="text-blue-500 hover:underline">View all</button>
            </div>
            {bookingsLoading ? (
              <p>Loading bookings...</p>
            ) : bookingsError ? (
              <p className="text-red-500">{bookingsError}</p>
            ) : (
              <Table aria-label="Recent bookings">
                <TableHeader>
                  <TableColumn className="bg-gray-50">Order Id</TableColumn>
                  <TableColumn className="bg-gray-50">
                    Customer Name
                  </TableColumn>
                  <TableColumn className="bg-gray-50">
                    Booking Date
                  </TableColumn>
                  <TableColumn className="bg-gray-50">
                    Payment Status
                  </TableColumn>
                  <TableColumn className="bg-gray-50">
                    Booking Status
                  </TableColumn>
                  <TableColumn className="bg-gray-50">Total</TableColumn>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.orderId}>
                      <TableCell>{booking.orderId}</TableCell>
                      <TableCell>{booking.customerName}</TableCell>
                      <TableCell>{booking.bookingDate}</TableCell>
                      <TableCell>{booking.paymentStatus}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            booking.bookingStatus === "Cancelled"
                              ? "bg-red-100 text-red-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {booking.bookingStatus}
                        </span>
                      </TableCell>
                      <TableCell>{booking.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardBody>
        </Card>

        {/* Recent Users */}
        <Card className="border-none shadow-sm">
          <CardBody>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Recent Users</h3>
              <button className="text-blue-500 hover:underline">View all</button>
            </div>
            <div className="space-y-4">
              {recentUsers.map((user, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Avatar
                    src="/placeholder.svg"
                    size="sm"
                    className="flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user.time} | {user.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
