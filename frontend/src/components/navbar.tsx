'use client';

import { User } from '@/app/types';
import { User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setError('Failed to load profile');
        }
      } catch (err) {
        setError('An error occurred');
      }
    };

    fetchProfile();
  }, [router]);

  if (error) return <p>{error}</p>;

  return (
    <nav className="w-full bg-black p-4 flex items-center justify-between text-white">
      <div className="flex flex-row gap-6 items-center">
        <Link href="/articles">
          <p className="text-3xl font-light">Speed</p>
        </Link>
        <div className="flex flex-row gap-4">
          <Link href="/articles">Articles</Link>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        {user && (
          <Link href="/profile" className="bg-gray-700 p-2 rounded-full">
            <UserIcon />
          </Link>
        )}
        {user ? (
          <Link href="/logout" className="px-4 py-2 rounded-md bg-red-500">
            Logout
          </Link>
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
