'use client';

import { toast } from '@/hooks/use-toast';
import { User } from '@/types';
import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (!accessToken && !refreshToken) return;
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${accessToken}`
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else if (res.status == 401 && refreshToken){
        console.log("Trying to get new access token")
        const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${refreshToken}`
          }
        })
        if(refreshRes.ok) {
          const refreshData = await refreshRes.json();
          localStorage.setItem('access_token', refreshData.access_token);
          localStorage.setItem('refresh_token', refreshData.refresh_token)
          await fetchProfile();
          return;
        }
      } else {
        localStorage.removeItem('access_token');
        setError('Failed to load profile');
      }
    } catch (err) {
      localStorage.removeItem('access_token');
      setError('An error occurred');
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token)
        await fetchProfile();
        router.push('/profile');
        return;
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  const logout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })
    // localStorage.removeItem('access_token')
    // localStorage.removeItem('refresh_token')
    // setUser(null);
    router.push('/');
    toast({
      variant: 'default',
      title: 'Logged out',
      description: 'You have been logged out',
    });
  };

  return <AuthContext.Provider value={{ user, accessToken, refreshToken, error, login, logout, fetchProfile }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;