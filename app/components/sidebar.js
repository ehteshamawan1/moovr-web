"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Car,
  FileCheck,
  History,
  LogOut,
  CarFront,
  Settings,
  Image,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "MAIN",
    items: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
      },
    ],
  },
  {
    title: "BOOKING MANAGEMENT",
    items: [
      {
        title: "Booking History",
        icon: History,
        href: "/dashboard/bookings",
      },
    ],
  },
  {
    title: "CUSTOMER MANAGEMENT",
    items: [
      {
        title: "Passengers",
        icon: Users,
        href: "/dashboard/passengers",
      },
    ],
  },
  {
    title: "DRIVER MANAGEMENT",
    items: [
      {
        title: "Drivers",
        icon: Car,
        href: "/dashboard/drivers",
      },
      {
        title: "Verify Drivers",
        icon: FileCheck,
        href: "/dashboard/verify-drivers",
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative">
      <aside
        className={cn(
          "bg-[#1a1c23] text-white fixed top-0 left-0 h-screen transition-all duration-300 ease-in-out",
          isCollapsed ? "w-[80px]" : "w-[250px]"
        )}
      >
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qasJiYbWaowaawUbl0pfET5CCxNtHf.png"
            alt="Logo"
            className={cn(
              "transition-all duration-300",
              isCollapsed ? "w-8" : "w-32"
            )}
          />
        </div>

        <div className="py-4 flex flex-col gap-4">
          {menuItems.map((section, idx) => (
            <div key={idx}>
              {!isCollapsed && (
                <div className="px-4 py-2">
                  <p className="text-xs text-gray-400">{section.title}</p>
                </div>
              )}
              {section.items.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 mx-2 rounded-lg transition-colors",
                      pathname === item.href
                        ? "bg-orange-500 text-white"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    )}
                  >
                    <item.icon size={20} />
                    {!isCollapsed && <span>{item.title}</span>}
                  </span>
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 w-full px-4">
          <Link href="/">
            <span
              className={cn(
                "flex items-center gap-2 px-4 py-2 mx-2 rounded-lg text-red-400 hover:bg-red-500/10",
                isCollapsed && "justify-center"
              )}
            >
              <LogOut size={20} />
              {!isCollapsed && <span>Log out</span>}
            </span>
          </Link>
        </div>
      </aside>

      {/* Collapse Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-3 top-6 h-6 w-6 rounded-full border bg-white text-gray-600 hover:bg-gray-100"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>
    </div>
  );
}
