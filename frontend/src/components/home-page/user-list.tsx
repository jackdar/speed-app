'use client';

import { useAuth } from '@/hooks/use-auth';
import { User } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UserList() {
  const router = useRouter();
  const { user, token } = useAuth();

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: 'no-cache',
      }).then((res) => res.json());

      setUsers(data);
    };

    fetchUsers();
  }, [token, user]);

  return (
    <div>
      {users.map((user, i) => (
        <div key={i} className="flex flex-row justify-between items-center">
          {/* <span className="rounded-full bg-gray-200 h-12 w-12 flex items-center justify-center">
            {user.firstName.charAt(0)} {user.lastName.charAt(0)}
          </span> */}
          <p>
            {user.firstName} {user.lastName}
          </p>
          <p>{user.email}</p>
          <p>{user.role}</p>
          <p>{user.bio}</p>
        </div>
      ))}
    </div>
  );
}
