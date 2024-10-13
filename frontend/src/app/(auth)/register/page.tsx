"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const formRegex = /^[a-zA-Z]+$/;
  const passwordRegex = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{}|;':"\\/?.,<>?]*$/;

  const registerSchema = z.object({
    firstName: z.string()
      .min(1, 'First name is required')
      .refine((value) => formRegex.test(value ?? ""), 'First name should contain only english letters and no spaces'),
    lastName: z.string()
      .min(1, 'Last name is required')
      .refine((value) => formRegex.test(value ?? ""), 'Last name should contain only englishh letters and no spaces'),
    email: z.string()
      .email('Invalid email address'),
    password: z.string()
      .min(1, 'Password cannot be empty')
      .refine((value) => passwordRegex.test(value ?? ""), 'Password should not contain spaces')
  })

  const {
    register,
    handleSubmit,
    formState: {errors}} = useForm<z.infer<typeof registerSchema>>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
  })

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (res.ok) {
        router.push("/login");
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred");
    }
  };

  return (
    <div className="flex-1 flex justify-center items-center bg-[#8D8D8D]">
      <div className="bg-gray-100 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl text-black mb-4 w-full text-start border-b border-black pb-2">
          Signup
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-black">
          <div className="mb-4">
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              placeholder="First Name"
              {...register("firstName")}
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
          </div>
          <div className="mb-4">
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              placeholder="Last Name"
              {...register("lastName")}
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
          </div>
          <div className="mb-4">
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <button
            className="w-full bg-[#646464] text-white p-2 rounded"
            type="submit"
          >
            Register
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
        <p className="text-center text-sm mt-4">
          Already got an account?{" "}
          <Link href="/login" className="font-medium">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
