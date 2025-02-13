"use client";

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
import { Eye, Pencil, Trash, ChevronDown, Search } from "lucide-react";

const passengers = [
  {
    id: 1,
    name: "pankaj",
    phone: "+91 xxxxxxxx87",
    gender: "Male",
    createdAt: "05 February 2025 10:54 AM",
    walletAmount: "$ 0.00",
    status: true,
  },
  {
    id: 2,
    name: "ssp",
    phone: "+91 xxxxxxxx88",
    gender: "Male",
    createdAt: "05 February 2025 08:59 AM",
    walletAmount: "$ 0.00",
    status: true,
  },
  {
    id: 3,
    name: "Alexis G",
    phone: "+32 xxxxxxx05",
    gender: "Male",
    createdAt: "04 February 2025 11:15 PM",
    walletAmount: "$ 0.00",
    status: true,
  },
  {
    id: 4,
    name: "abccaga",
    phone: "+91 xxxxxxxx89",
    gender: "Male",
    createdAt: "04 February 2025 06:09 PM",
    walletAmount: "$ 0.00",
    status: true,
  },
  // Add more passengers as needed
];

export default function PassengersPage() {
  return (
    <div className="p-6 space-y-6 bg-gray-50/50">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Users</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-orange-500">Users</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <Select>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Name" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="date">Date</SelectItem>
          </SelectContent>
        </Select>

        <div className="relative flex items-center">
          <Input placeholder="Search here" className="w-64 pl-8" />
          <Search className="absolute left-2 h-4 w-4 text-gray-400" />
        </div>

        <Select>
          <SelectTrigger className="w-20">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-gray-50/80">PROFILE IMAGE</TableHead>
              <TableHead className="bg-gray-50/80">FULL NAME</TableHead>
              <TableHead className="bg-gray-50/80">GENDER</TableHead>
              <TableHead className="bg-gray-50/80">CREATED AT</TableHead>
              <TableHead className="bg-gray-50/80">WALLET AMOUNT</TableHead>
              <TableHead className="bg-gray-50/80">STATUS</TableHead>
              <TableHead className="bg-gray-50/80">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {passengers.map((passenger) => (
              <TableRow key={passenger.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" alt={passenger.name} />
                    <AvatarFallback>{passenger.name[0]}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{passenger.name}</p>
                    <p className="text-gray-500 text-sm">{passenger.phone}</p>
                  </div>
                </TableCell>
                <TableCell>{passenger.gender}</TableCell>
                <TableCell>{passenger.createdAt}</TableCell>
                <TableCell>{passenger.walletAmount}</TableCell>
                <TableCell>
                  <Switch
                    checked={passenger.status}
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
