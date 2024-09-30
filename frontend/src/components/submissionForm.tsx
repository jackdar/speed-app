"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  title: z
    .string()
    .nonempty('Title is required'),
  author: z
    .string()
    .nonempty('Author is required'),
  publisher: z
    .string()
    .nonempty('Publisher is required'),
  journal: z
    .string()
    .nonempty('Journal is required'),
  year: z
    .number({ invalid_type_error: 'Year must be a number' })
    .min(1900, 'Year must be after 1900')
    .max(new Date().getFullYear(), 'Year cannot be in the future'),
  volume: z
    .number({ invalid_type_error: 'Volumes must be a number' }),
  pages: z
    .number({ invalid_type_error: 'Pages must be a number' }),
  doi: z
    .number({ invalid_type_error: 'Pages must be a number' }),
});

const PaperForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-black p-4">
        <div className="container mx-auto">
          <h1 className="text-white text-2xl">Speed App</h1>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex justify-center items-center py-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-100 p-8 rounded shadow-md w-3/4"
        >
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Submit an Article
          </h1>

          {/* Title Field */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-semibold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              {...register('title')}
              className={`w-full px-3 py-2 border ${
                errors.title ? 'border-red-500' : 'border-gray-400'
              } rounded focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Author Field */}
          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-gray-700 font-semibold mb-2"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              {...register('author')}
              className={`w-full px-3 py-2 border ${
                errors.author ? 'border-red-500' : 'border-gray-400'
              } rounded focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.author && (
              <p className="text-red-500 text-sm mt-1">
                {errors.author.message}
              </p>
            )}
          </div>

          {/* Publisher Field */}
          <div className="mb-4">
            <label
              htmlFor="publisher"
              className="block text-gray-700 font-semibold mb-2"
            >
              Publisher
            </label>
            <input
              type="text"
              id="publisher"
              {...register('publisher')}
              className={`w-full px-3 py-2 border ${
                errors.publisher ? 'border-red-500' : 'border-gray-400'
              } rounded focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.publisher && (
              <p className="text-red-500 text-sm mt-1">
                {errors.publisher.message}
              </p>
            )}
          </div>

          {/* Journal Field */}
          <div className="mb-4">
            <label
              htmlFor="journal"
              className="block text-gray-700 font-semibold mb-2"
            >
              Journal
            </label>
            <input
              type="text"
              id="journal"
              {...register('journal')}
              className={`w-full px-3 py-2 border ${
                errors.journal ? 'border-red-500' : 'border-gray-400'
              } rounded focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.journal && (
              <p className="text-red-500 text-sm mt-1">
                {errors.journal.message}
              </p>
            )}
          </div>

          {/* Year Field */}
          <div className="mb-4">
            <label
              htmlFor="year"
              className="block text-gray-700 font-semibold mb-2"
            >
              Year
            </label>
            <input
              type="number"
              id="year"
              {...register('year', { valueAsNumber: true })}
              className={`w-full px-3 py-2 border ${
                errors.year ? 'border-red-500' : 'border-gray-400'
              } rounded focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.year && (
              <p className="text-red-500 text-sm mt-1">
                {errors.year.message}
              </p>
            )}
          </div>

          {/* Volume Field */}
          <div className="mb-4">
            <label
              htmlFor="volume"
              className="block text-gray-700 font-semibold mb-2"
            >
              Volume
            </label>
            <input
              type="text"
              id="volume"
              {...register('volume')}
              className={`w-full px-3 py-2 border ${
                errors.volume ? 'border-red-500' : 'border-gray-400'
              } rounded focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.volume && (
              <p className="text-red-500 text-sm mt-1">
                {errors.volume.message}
              </p>
            )}
          </div>

          {/* Pages Field */}
          <div className="mb-4">
            <label
              htmlFor="pages"
              className="block text-gray-700 font-semibold mb-2"
            >
              Pages
            </label>
            <input
              type="text"
              id="pages"
              {...register('pages')}
              className={`w-full px-3 py-2 border ${
                errors.pages ? 'border-red-500' : 'border-gray-400'
              } rounded focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.pages && (
              <p className="text-red-500 text-sm mt-1">
                {errors.pages.message}
              </p>
            )}
          </div>

          {/* DOI Field */}
          <div className="mb-4">
            <label
              htmlFor="doi"
              className="block text-gray-700 font-semibold mb-2"
            >
              DOI
            </label>
            <input
              type="text"
              id="doi"
              {...register('doi')}
              className={`w-full px-3 py-2 border ${
                errors.doi ? 'border-red-500' : 'border-gray-400'
              } rounded focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {errors.doi && (
              <p className="text-red-500 text-sm mt-1">
                {errors.doi.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2 rounded hover:bg-gray-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaperForm;
