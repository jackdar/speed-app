'use client';

import { useAuth } from '@/hooks/use-auth';
import { roleHierarchy } from '@/lib/with-auth';
import { UserIcon, Menu } from 'lucide-react';
import Link from 'next/link';
import ActiveLink from './active-link';
import NotificationDropdown from './notification/notification-dropdown';
import SpeedLogo from './svg/speed-logo';
import { Button } from './ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils'

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
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);

  let userLinks: ('guest' | 'registered' | 'moderator' | 'analyst' | 'admin')[];
  if (user) {
    userLinks = roleHierarchy[user.role as keyof typeof roleHierarchy];
  } else {
    userLinks = roleHierarchy['guest'];
  }
  const filteredRoutes = routes.filter((route) =>
    userLinks.some((permission: string) =>
      route.permissions.includes(permission),
    ),
  );

  return (
    <nav className="sticky top-0 w-full bg-black p-4 flex items-center justify-between text-white z-50">
      <aside
        className={cn(
          "absolute lg:hidden top-0 w-1/3 h-screen p-8 pt-24 bg-black transition-all duration-150 ease-in-out",
          navbarOpen ? "left-0" : "left-[-100vw]",
        )}
      >
        <div className="flex flex-col gap-4 w-full mt-18">
          {filteredRoutes.map((link, i) => (
            <ActiveLink
              key={i}
              href={link.href}
              onClick={() => setNavbarOpen((prev) => !prev)}
            >
              {link.name}
            </ActiveLink>
          ))}
        </div>
      </aside>
      <div className="flex flex-row gap-6 items-center z-40">
        <Button
          className="flex lg:hidden p-2"
          onClick={() => setNavbarOpen((prev) => !prev)}
        >
          <Menu />
        </Button>
        <Link href="/articles">
          <SpeedLogo className="w-24" />
        </Link>
        <div className="hidden lg:flex flex-row gap-4">
          {filteredRoutes.map((link) => (
            <ActiveLink key={link.href} href={link.href}>
              {link.name}
            </ActiveLink>
          ))}
        </div>
      </div>
      {user != null && token != null ? (
        <NotificationDropdown {...{ user, token }} />
      ) : (
        ''
      )}
      <div className="flex flex-row gap-4">
        {user && (
          <>
            <Button variant="outline" className="bg-transparent" asChild>
              <Link href="/submission">Submit Article</Link>
            </Button>
            <Link
              href="/profile"
              className="bg-gray-700 rounded-full m-auto p-1.5"
            >
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
