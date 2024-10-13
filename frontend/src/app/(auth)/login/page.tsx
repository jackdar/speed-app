'use client';

import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();
  const { user, login, error } = useAuth();

  useEffect(() => {
    if (user) router.push('articles');
  }, [user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login(form.email, form.password);
  };

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');

      if (token != null) {
        router.push('articles');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="flex-1 flex justify-center items-center bg-[#8D8D8D]">
      <div className="bg-gray-100 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl text-black mb-4 w-full text-start border-b border-black pb-2">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-[#646464] text-white p-2 rounded"
          >
            Login
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        <p className="text-center text-sm mt-4">
          Haven&apos;t got an account?{' '}
          <Link href="/register" className="font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
