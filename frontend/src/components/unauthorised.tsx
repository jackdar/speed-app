'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

export default function Unauthorised() {
  const router = useRouter();

  return (
    <div className="flex-1 flex justify-center items-center bg-[#8D8D8D]">
      <div className="bg-gray-100 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl text-black mb-4 w-full text-start border-b border-black pb-2">
          Unauthorised
        </h1>
        <p>You do not have permission to view this content.</p>
        <Button className="w-full mt-4" onClick={() => router.back()}>
          Back
        </Button>
      </div>
    </div>
  );
}
