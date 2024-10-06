import { useAuthContext } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { FunctionComponent, useEffect } from 'react';

const withAuth = (WrappedComponent: FunctionComponent) => {
  const Wrapper = (props: any) => {
    const { user } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      // If the user is not authenticated, redirect them to the login page
      if (!user) {
        router.push('/login');
      }
    }, [user, router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
