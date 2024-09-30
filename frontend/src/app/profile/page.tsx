"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "../types";
import React from "react";

const ProfilePage = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [error, setError] = useState("");
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setError("Failed to load profile");
        }
      } catch (err) {
        setError("An error occurred");
      }
    };

    fetchProfile();
  }, [router]);

  if (error)
    return (
      <p>
        <button onClick={logout}>Logout</button>
      </p>
    );
  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>User Profile</h2>
      <p>
        Name: {user.firstName} {user.lastName}
      </p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
