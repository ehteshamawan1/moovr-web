"use client"

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown"
import { Avatar } from "@nextui-org/avatar"
import { Sun } from "lucide-react"

export function Navbar() {
  return (
    <nav className="h-16 border-b px-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold">MyTaxi Admin</h1>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Sun size={20} />
        </button>
        <Dropdown>
          <DropdownTrigger>
            <Avatar src="/placeholder.svg" size="sm" className="cursor-pointer" />
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem>Profile</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem className="text-danger" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </nav>
  )
}

