"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function UserInfoPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  // Retrieve token dynamically (adjust if using a different auth strategy)
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setError("No token found");
    }
  }, []);

  // Function to fetch user information from the API
  const fetchUserInfo = async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://moovr-api.vercel.app/api/api/v1/auth/get-user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }
      const data = await response.json();
      setUser(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user info once the token is available
  useEffect(() => {
    if (token) {
      fetchUserInfo();
    }
  }, [token]);

  return (
    <div className="p-6 space-y-6 bg-gray-50/50">
      <h1 className="text-2xl font-semibold">User Information</h1>
      {loading ? (
        <p>Loading user info...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : user ? (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt={`${user.firstName} ${user.lastName}`} />
              <AvatarFallback>{user.firstName?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-medium">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-500">{user.phone}</p>
            </div>
          </div>
          <div className="mt-4 space-y-1">
            <p>
              <strong>Role:</strong> {user.role}
            </p>
            <p>
              <strong>City:</strong> {user.city}
            </p>
            <p>
              <strong>Driver Type:</strong> {user.driverType}
            </p>
            <p>
              <strong>Service Type:</strong> {user.serviceType}
            </p>
            <p>
              <strong>Car Category:</strong> {user.carCategory}
            </p>
            <p>
              <strong>Referral Code:</strong> {user.referralCode}
            </p>
          </div>
        </div>
      ) : (
        <p>No user info found.</p>
      )}
      <Button onClick={fetchUserInfo} disabled={loading}>
        {loading ? "Refreshing..." : "Refresh Info"}
      </Button>
    </div>
  );
}
