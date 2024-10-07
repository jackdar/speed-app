'use client';

import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ToastAction } from '../ui/toast';

const schema = z.object({
  title: z.string().nonempty('Title is required'),
  author: z.string().nonempty('Author is required'),
  publisher: z.string().nonempty('Publisher is required'),
  journal: z.string().nonempty('Journal is required'),
  year: z
    .number({ invalid_type_error: 'Year must be a number' })
    .min(1900, 'Year must be after 1900')
    .max(new Date().getFullYear(), 'Year cannot be in the future'),
  volume: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => (val ? Number(val) : undefined)),
  pagesStart: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => (val ? Number(val) : undefined)),
  pagesEnd: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => (val ? Number(val) : undefined)),
  doi: z.string().nonempty('DOI is required'),
  isPosted: z.boolean().default(false),
  dateCreated: z.date().optional(),
  dateUpdated: z.date().optional(),
});

const PaperForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/article/new`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
          action: (
            <ToastAction altText="Try again" onClick={() => onSubmit(data)}>
              Try again
            </ToastAction>
          ),
        });
        console.error('Error submitting article:', errorData.message);
        return;
      }

      toast({
        variant: 'default',
        title: 'Article submitted successfully!.',
        description:
          'Your article has been submitted for review. Please check back later.',
      });
      console.log('Article submitted successfully');

      router.push('/submission/complete');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          } rounded`}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
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
          } rounded`}
        />
        {errors.author && (
          <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
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
          } rounded`}
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
          } rounded`}
        />
        {errors.journal && (
          <p className="text-red-500 text-sm mt-1">{errors.journal.message}</p>
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
          } rounded`}
        />
        {errors.year && (
          <p className="text-red-500 text-sm mt-1">{errors.year.message}</p>
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
          } rounded`}
        />
        {errors.volume && (
          <p className="text-red-500 text-sm mt-1">{errors.volume.message}</p>
        )}
      </div>

      {/* Pages Start Field */}
      <div className="mb-4">
        <label
          htmlFor="pagesStart"
          className="block text-gray-700 font-semibold mb-2"
        >
          Starting Page
        </label>
        <input
          type="number"
          id="pagesStart"
          {...register('pagesStart')}
          className={`w-full px-3 py-2 border ${
            errors.pagesStart ? 'border-red-500' : 'border-gray-400'
          } rounded`}
        />
        {errors.pagesStart && (
          <p className="text-red-500 text-sm mt-1">
            {errors.pagesStart.message}
          </p>
        )}
      </div>

      {/* Pages End Field */}
      <div className="mb-4">
        <label
          htmlFor="pagesEnd"
          className="block text-gray-700 font-semibold mb-2"
        >
          Ending Page
        </label>
        <input
          type="number"
          id="pagesEnd"
          {...register('pagesEnd')}
          className={`w-full px-3 py-2 border ${
            errors.pagesEnd ? 'border-red-500' : 'border-gray-400'
          } rounded`}
        />
        {errors.pagesEnd && (
          <p className="text-red-500 text-sm mt-1">{errors.pagesEnd.message}</p>
        )}
      </div>

      {/* DOI Field */}
      <div className="mb-4">
        <label htmlFor="doi" className="block text-gray-700 font-semibold mb-2">
          DOI
        </label>
        <input
          type="text"
          id="doi"
          {...register('doi')}
          className={`w-full px-3 py-2 border ${
            errors.doi ? 'border-red-500' : 'border-gray-400'
          } rounded`}
        />
        {errors.doi && (
          <p className="text-red-500 text-sm mt-1">{errors.doi.message}</p>
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
  );
};

export default PaperForm;
