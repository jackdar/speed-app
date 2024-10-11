'use client';

import PaperForm from '@/components/submission/submission-form';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function SubmissionPage() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-start bg-[#8D8D8D] p-8">
      <div className="bg-gray-100 p-8 rounded shadow-md w-3/4">
        <h2 className="flex flex-row justify-between text-2xl text-black mb-8 w-full text-start border-b border-black pb-2">
          Submit a New Article
          <Button
            variant="outline"
            className="border-black"
            onClick={() => router.back()}
          >
            Back
          </Button>
        </h2>
        <PaperForm />
      </div>
    </div>
  );
}
