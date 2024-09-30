'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'registered',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        },
      );

      if (res.ok) {
        router.push('/login');
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  return (
    <div className="flex-1 flex justify-center items-center bg-[#8D8D8D]">
      <div className="bg-gray-100 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-center text-2xl text-black mb-4 w-full text-start border-b border-black pb-2">
          Signup
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-black">
          <input
            className="w-full p-2 border border-gray-300 rounded"
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
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
            className="w-full bg-[#646464] text-white p-2 rounded"
            type="submit"
          >
            Register
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
