"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash, Search } from "lucide-react";

export default function DriversPage() {
  // In this example the API returns booking objects:
  // {
  //   "driver": "driver_id_here",
  //   "location": "123 Main St",
  //   "carName": "Toyota Camry",
  //   "carNumber": "ABC123",
  //   "startTime": 8,
  //   "endTime": 12,
  //   "totalPrice": 200,
  //   "paymentMethod": "credit_card",
  //   "status": "pending"
  // }
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch booking data from the live API endpoint
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "https://moovr-api.vercel.app/api/v1/bookings/user-bookings"
        );
        // Assuming the API returns an object with a "bookings" array:
        setBookings(response.data.bookings || []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-6 bg-gray-50/50">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">User Bookings</h1>
      </div>

      {/* Filter and Search */}
      <div className="flex gap-3 justify-end">
        <Select>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex items-center">
          <Input placeholder="Search here" className="w-64 pl-8" />
          <Search className="absolute left-2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>DRIVER</TableHead>
              <TableHead>LOCATION</TableHead>
              <TableHead>CAR NAME</TableHead>
              <TableHead>CAR NUMBER</TableHead>
              <TableHead>TIME</TableHead>
              <TableHead>TOTAL PRICE</TableHead>
              <TableHead>PAYMENT METHOD</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking, index) => (
              <TableRow key={index}>
                <TableCell>{booking.driver}</TableCell>
                <TableCell>{booking.location}</TableCell>
                <TableCell>{booking.carName}</TableCell>
                <TableCell>{booking.carNumber}</TableCell>
                <TableCell>
                  {booking.startTime} - {booking.endTime}
                </TableCell>
                <TableCell>${booking.totalPrice}</TableCell>
                <TableCell>{booking.paymentMethod}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : booking.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : booking.status === "cancelled"
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
