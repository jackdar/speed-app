import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export default function SubmissionDialog() {
  const router = useRouter();

  return (
    <div className="flex-1 flex justify-center items-center bg-[#8D8D8D]">
      <div className="bg-gray-100 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl text-black mb-4 w-full text-start border-b border-black pb-2">
          Submission Complete
        </h1>
        <p>
          You have successfully submitted a new article to SPEED. Please check
          back later for moderation and analysis status.
        </p>
        <Button className="w-full mt-4" onClick={() => router.push('/')}>
          Back
        </Button>
      </div>
    </div>
  );
}
