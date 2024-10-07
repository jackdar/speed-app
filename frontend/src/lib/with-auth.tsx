'use client';

import Unauthorised from '@/components/unauthorised';
import { useAuth } from '@/hooks/use-auth';
import { User } from '@/types';
import { useRouter } from 'next/navigation';
import { FunctionComponent } from 'react';

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

    // Check if the user's role is sufficient for the required role
    const userRole = user?.role || 'guest';
    const userPermissions = roleHierarchy[userRole];

    if (userPermissions.includes(requiredRole)) {
      return <WrappedComponent {...props} />;
    } else {
      return <Unauthorised />;
    }
  };
};

export default withAuth;
