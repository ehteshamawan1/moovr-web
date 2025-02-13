"use client";

import { Sidebar } from "../components/sidebar";
import { Navbar } from "../components/navbar";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <div className="flex-1">
        {/* <Navbar /> */}
        <main
          className={
            ("flex-1 p-6 transition-all",
            isCollapsed ? "ml-[80px]" : "ml-[250px]")
          }
        >
          {children}
        </main>
      </div>
    </div>
  );
}
