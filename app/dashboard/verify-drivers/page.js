"use client"

import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table"
import { Button } from "@nextui-org/button"
import { Chip } from "@nextui-org/chip"
import { Edit2, Trash } from "lucide-react"

export default function VerifyDriversPage() {
  const drivers = [
    {
      name: "Vikas",
      email: "vixxx@gmail.com",
      isVerified: true,
    },
    {
      name: "Taxi Alex",
      email: "dixxxxxxx@ldidks.fe",
      isVerified: true,
    },
    {
      name: "Asdf",
      email: "shxxxxxxxxxxxxx@gmail.com",
      isVerified: false,
    },
    // Add more drivers
  ]

  return (
    <div className="space-y-6">
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
            <TableRow key={driver.email}>
              <TableCell>{driver.name}</TableCell>
              <TableCell>{driver.email}</TableCell>
              <TableCell>
                {driver.isVerified ? (
                  <Chip color="success" variant="flat">
                    Verified
                  </Chip>
                ) : (
                  <Button size="sm" color="primary">
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
  )
}

