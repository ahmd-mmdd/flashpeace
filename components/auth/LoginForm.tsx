"use client";

import { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Dashboard from "@/components/dashboard/Dashboard";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("flashpeace-user");

    if (savedUser) {
      setLoggedInUser(savedUser);
    }
  }, []);

  function handleLogin() {
    if (!username.trim()) {
      alert("Username tidak boleh kosong.");
      return;
    }

    localStorage.setItem("flashpeace-user", username);
    setLoggedInUser(username);
  }

  function handleLogout() {
    localStorage.removeItem("flashpeace-user");
    setLoggedInUser("");
    setUsername("");
  }

  // Kalau sudah login, tampilkan dashboard
  if (loggedInUser) {
  return <Dashboard username={loggedInUser} />;
}

  // Kalau belum login, tampilkan form login
  return (
    <div className="space-y-4">
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <p className="text-sm text-gray-500">
        Halo, {username || "Student"} 👋
      </p>

      <Input
        type="password"
        placeholder="Password"
      />

      <Button onClick={handleLogin}>
        Login
      </Button>

      <Button variant="secondary">
        Continue as Guest
      </Button>
    </div>
  );
}