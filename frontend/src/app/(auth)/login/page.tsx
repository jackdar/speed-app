'use client';

import { useAuth } from '@/hooks/use-auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const LoginPage = () => {
  const router = useRouter();
  const { user, login, error } = useAuth();

  useEffect(() => {
    if (user) router.push('/');
  }, [user, router]);

  const loginSchema = z.object({
    email: z.string()
      .email('Invalid email address'),
    password: z.string()
  })

  const {
    register,
    handleSubmit,
    formState: {errors}} = useForm<z.infer<typeof loginSchema>>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        email: "",
        password: ""
      }
    })

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    login(data.email, data.password);
  }

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');

      if (token != null) {
        router.push('/');
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-black">
          <div className="mb-4">
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <button type="submit" className="w-full bg-[#646464] text-white p-2 rounded">
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
