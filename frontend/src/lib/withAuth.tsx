'use client';

import Unauthorised from '@/components/unauthorised';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/types';
import { useRouter } from 'next/navigation';
import { FunctionComponent, useEffect } from 'react';

// Define role hierarchy with access arrays
export const roleHierarchy: Record<User['role'], User['role'][]> = {
  guest: ['guest'],
  registered: ['guest', 'registered'],
  moderator: ['guest', 'registered', 'moderator'],
  analyst: ['guest', 'registered', 'analyst'],
  admin: ['guest', 'registered', 'moderator', 'analyst', 'admin'],
};

const withAuth = (
  WrappedComponent: FunctionComponent,
  requiredRole: User['role'] = 'registered',
) => {
  return function Wrapper(props: any) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      console.log('Checking user role - user: ', user);
      // If the user is not authenticated, redirect them to the login page
      if (!user) {
        router.push('/login');
        return;
      }
    }, [user, router]);

    // Check if the user's role is sufficient for the required role
    const userRole = user?.role || 'guest';
    const userPermissions = roleHierarchy[userRole];

    if (userPermissions.includes(requiredRole)) {
      return <WrappedComponent {...props} />;
    }

    return <Unauthorised />;
  };
};

export default withAuth;
