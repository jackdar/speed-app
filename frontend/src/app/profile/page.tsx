"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "../types";

const ProfilePage = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [error, setError] = useState("");
  const router = useRouter();

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

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex-1 flex justify-center items-start bg-[#8D8D8D] p-8">
      <div className="bg-gray-100 p-8 rounded shadow-md w-full">
        <h2 className=" text-2xl text-black mb-4 w-full text-start border-b border-black pb-2">
          {user.firstName}&apos;s Profile
        </h2>
        <div className="grid grid-cols-3 auto-rows-auto gap-4">
          <p>
            Name: {user.firstName} {user.lastName}
          </p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
