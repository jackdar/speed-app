"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import React from "react";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.access_token);
        router.push("/profile");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred");
    }
  };

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");

      if (token != null) {
        router.push("articles");
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#8D8D8D] flex flex-col">
      <div className="w-full">
        <Navbar />
      </div>

      <div className="flex-1 flex justify-center items-center">
        <div className="bg-gray-100 p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-center text-2xl text-black mb-4 w-full text-start border-b border-black pb-2">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 text-black">
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full bg-[#646464] text-white p-2 rounded"
            >
              Login
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
