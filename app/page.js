"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // Demo credentials check
    if (
      credentials.email === "admin@admin.com" &&
      credentials.password === "admin"
    ) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex gap-3 justify-center p-5">
          <div className="flex flex-col items-center">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qasJiYbWaowaawUbl0pfET5CCxNtHf.png"
              alt="Logo"
              className="h-8"
            />
            <h1 className="text-xl font-bold">Admin Login</h1>
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              required
            />
            <Input
              label="Password"
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
            />
            <Button color="primary" type="submit">
              Login
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
