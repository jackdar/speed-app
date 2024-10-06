import { useAuthContext } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { FunctionComponent, useEffect } from 'react';

const withAuth = ({
  WrappedComponent,
  role = 'registered',
}: {
  WrappedComponent: FunctionComponent;
  role: string;
}) => {
  return function Wrapper(props: any) {
    const { user } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      // If the user is not authenticated, redirect them to the login page
      if (!user) {
        router.push('/login');
        return;
      }
    }, [user, router]);

    return user?.role === role ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
