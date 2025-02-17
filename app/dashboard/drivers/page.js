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
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Eye, Pencil, Trash, Search } from "lucide-react";

export default function DriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        // Using the "Get All Drivers" endpoint.
        const response = await axios.get(
          "https://moovr-api.vercel.app/api/v1/auth/drivers/all"
        );
        // The API response structure:
        // {
        //   drivers: [
        //     {
        //       firstName: "string",
        //       lastName: "string",
        //       phone: "string",
        //       role: "string",
        //       city: "string",
        //       driverType: "string",
        //       serviceType: "string",
        //       carCategory: "string",
        //       referralCode: "string"
        //     },
        //     ...
        //   ]
        // }
        setDrivers(response.data.drivers || []);
      } catch (err) {
        setError("Failed to fetch drivers");
      } finally {
        setLoading(false);
      }
    };
    fetchDrivers();
  }, []);

  if (loading) return <p>Loading drivers...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 space-y-6 bg-gray-50/50">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Drivers</h1>
      </div>

      <div className="flex gap-3 justify-end">
        <Select>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Name" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="phone">Phone</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex items-center">
          <Input placeholder="Search here" className="w-64 pl-8" />
          <Search className="absolute left-2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PROFILE IMAGE</TableHead>
              <TableHead>FULL NAME</TableHead>
              <TableHead>PHONE</TableHead>
              <TableHead>CITY</TableHead>
              <TableHead>SERVICE TYPE</TableHead>
              <TableHead>DRIVER TYPE</TableHead>
              <TableHead>CAR CATEGORY</TableHead>
              <TableHead>REFERRAL CODE</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead>ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drivers.map((driver, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src="/placeholder.svg"
                      alt={driver.firstName}
                    />
                    <AvatarFallback>
                      {driver.firstName[0]}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  <p className="font-medium">
                    {driver.firstName} {driver.lastName}
                  </p>
                </TableCell>
                <TableCell>{driver.phone}</TableCell>
                <TableCell>{driver.city}</TableCell>
                <TableCell>{driver.serviceType}</TableCell>
                <TableCell>{driver.driverType}</TableCell>
                <TableCell>{driver.carCategory}</TableCell>
                <TableCell>{driver.referralCode}</TableCell>
                <TableCell>
                  <Switch
                    checked={true}
                    className="data-[state=checked]:bg-orange-500"
                  />
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
