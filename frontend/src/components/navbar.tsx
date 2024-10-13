'use client';

import { User as UserIcon } from "lucide-react";
import Link from "next/link";
import NotificationDropdown from "./notification/notification-dropdown";
import { roleHierarchy } from '@/lib/with-auth';
import { Button } from './ui/button';
import { useAuth } from "@/hooks/use-auth";

const routes = [
  {
    name: 'Articles',
    href: '/articles',
    permissions: ['guest', 'registered', 'moderator', 'analyst', 'admin'],
  },
  {
    name: 'Moderate',
    href: '/moderate',
    permissions: ['moderator', 'admin'],
  },
  {
    name: 'Analyse',
    href: '/analyse',
    permissions: ['analyst', 'admin'],
  },
  {
    name: 'Admin',
    href: '/admin',
    permissions: ['admin'],
  },
];

export default function Navbar() {
  const { user, token, logout } = useAuth();

 
  let userLinks: ("guest" | "registered" | "moderator" | "analyst" | "admin")[];
  if(user) {
    userLinks = roleHierarchy[user.role as keyof typeof roleHierarchy];
  } else {
    userLinks = roleHierarchy["guest"];
  }
  const filteredRoutes = routes.filter((route) =>
    userLinks.some((permission: string) => route.permissions.includes(permission)),
  );
 
  return (
    <nav className="sticky top-0 w-full bg-black p-4 flex items-center justify-between text-white z-50">
      <div className="flex flex-row gap-6 items-center">
        <Link href="/">
          <p className="text-3xl font-light">Speed</p>
        </Link>
        <div className="flex flex-row gap-4">
          {filteredRoutes.map((link) => (
            <Link key={link.href} href={link.href}>
              <p>{link.name}</p>
            </Link>
          ))}
        </div>
      </div>
      {/* <p>Notifications ({notifications.length})</p> */}
      {user != null && token != null ? (
        <NotificationDropdown {...{user, token}} />
      ) : ""
      }
      <div className="flex flex-row gap-4">
        {user && (
          <>
            <Button variant="outline" className="bg-transparent" asChild>
              <Link href="/submission">Submit Article</Link>
            </Button>
            <Link href="/profile" className="bg-gray-700 rounded-full m-auto p-1.5">
              <UserIcon />
            </Link>
          </>
        )}
        {user ? (
          <Button onClick={logout} variant="destructive">
            Logout
          </Button>
        ) : (
          <Button variant="outline" className="bg-transparent" asChild>
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
