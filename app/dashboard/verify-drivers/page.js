"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Edit2, Trash } from "lucide-react";

export default function VerifyDriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all drivers from the API
  const fetchDrivers = async () => {
    try {
      const response = await axios.get(
        "https://moovr-api.vercel.app/api/v1/auth/drivers/all"
      );
      // Assuming the API returns an object with a "drivers" array
      setDrivers(response.data.drivers || []);
    } catch (err) {
      console.error("Error fetching drivers:", err);
      setError("Failed to fetch drivers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  // Handler for verifying a driver.
  // Here we assume there's an API endpoint to verify the driver.
  const handleVerify = async (driverId) => {
    try {
      await axios.post("https://moovr-api.vercel.app/api/v1/driver/verify", {
        driverId,
      });
      // After a successful verification, refresh the driver list.
      fetchDrivers();
    } catch (err) {
      console.error("Error verifying driver:", err);
      alert("Failed to verify driver.");
    }
  };

  if (loading) return <p>Loading drivers...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Verify Drivers</h1>
      </div>

      <Table aria-label="Drivers verification table">
        <TableHeader>
          <TableColumn>DRIVER NAME</TableColumn>
          <TableColumn>DRIVER EMAIL</TableColumn>
          <TableColumn>DOCUMENT VERIFY</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody>
          {drivers.map((driver) => (
            <TableRow key={driver._id}>
              <TableCell>{driver.name}</TableCell>
              <TableCell>{driver.email}</TableCell>
              <TableCell>
                {driver.isVerified ? (
                  <Chip color="success" variant="flat">
                    Verified
                  </Chip>
                ) : (
                  <Button
                    size="sm"
                    color="primary"
                    onClick={() => handleVerify(driver._id)}
                  >
                    Verify
                  </Button>
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button isIconOnly size="sm" variant="light">
                    <Edit2 size={18} />
                  </Button>
                  <Button isIconOnly size="sm" variant="light" color="danger">
                    <Trash size={18} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
