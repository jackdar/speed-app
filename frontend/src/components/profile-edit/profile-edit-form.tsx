'use client';

import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ToastAction } from '../ui/toast';

const ProfileEditForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { user, accessToken, fetchProfile } = useAuth();

  if (!user) throw new Error('User is not authenticated!');

  const schema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z
      .string()
      .email('Invalid email address')
      .refine((val) => val === user.email, {
        message: 'Email must match the current user email',
      }),
    bio: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to edit user profile: ' + res.statusText);

        toast({
          variant: 'default',
          title: 'User profile edited successfully!.',
        });

        fetchProfile();
        router.push('/profile/edit/complete');
      })
      .catch((ex) => {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request. See the console for more information.',
          action: (
            <ToastAction altText="Try again" onClick={() => onSubmit(data)}>
              Try again
            </ToastAction>
          ),
        });

        console.error(ex);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* First Name Field */}
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-2">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          {...register('firstName')}
          value={user.firstName}
          className={`w-full px-3 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-400'} rounded`}
        />
        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
      </div>

      {/* Last Name Field */}
      <div className="mb-4">
        <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          {...register('lastName')}
          value={user.lastName}
          className={`w-full px-3 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-400'} rounded`}
        />
        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
      </div>

      {/* Email Field */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
          Confirm Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-400'} rounded`}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      {/* Bio Field */}
      <div className="mb-4">
        <label htmlFor="bio" className="block text-gray-700 font-semibold mb-2">
          Bio
        </label>
        <textarea
          id="bio"
          {...register('bio')}
          defaultValue={user.bio}
          className={`w-full px-3 py-2 border ${errors.bio ? 'border-red-500' : 'border-gray-400'} rounded`}
        />
        {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>}
      </div>

      {/* Submit Button */}
      <button type="submit" className="w-full bg-black text-white font-semibold py-2 rounded hover:bg-gray-800">
        Confirm Edit
      </button>
    </form>
  );
};

export default ProfileEditForm;
