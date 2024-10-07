"use client";

import { useAuth } from "../app/hooks/useAuth";
import { User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import NotificationDropdown from "./notification/notification-dropdown";

export default function Navbar() {
  const { user, logout } = useAuth();

  // const [notifications, setNotifications] = useState([]);

  // useEffect(() => {
  //   const fetchNoti = async () => {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/notifications/moderator`);
  //     const data = await response.json();
  //     setNotifications(data);
  //   }

  //   fetchNoti();
  // }, []);

  return (
    <nav className="w-full bg-black p-4 flex items-center justify-between text-white">
      <div className="flex flex-row gap-6 items-center">
        <Link href="/articles">
          <p className="text-3xl font-light">Speed</p>
        </Link>
        <div className="flex flex-row gap-4">
          <Link href="/articles">Articles</Link>
          <Link href="/moderate">Moderate</Link>
        </div>
      </div>
      {/* <p>Notifications ({notifications.length})</p> */}
      <NotificationDropdown/>
      <div className="flex flex-row gap-4">
        {user && (
          <Link href="/profile" className="bg-gray-700 p-2 rounded-full">
            <UserIcon />  
          </Link>
        )}
        {user ? (
          <button onClick={logout} className="px-4 py-2 rounded-md bg-red-500">
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 rounded-md border-2 border-white"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
