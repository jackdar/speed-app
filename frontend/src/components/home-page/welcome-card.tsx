'use client';

import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export default function HomeWelcomeCard({ className }: { className?: string }) {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div className={cn('bg-gray-100 p-8 rounded shadow-md', className)}>
      <h1 className="text-2xl text-black mb-4 w-full text-start border-b border-black pb-2">Welcome to SPEED</h1>
      <p className="mb-4">
        SPEED is a platform for sharing and analyzing articles on software engineering. Feel free to take a look here at the most popular
        articles shared by our community, or search for articles on a specific topic on the article search page. Alternatively, if you would
        like to submit a new article for review, sign in or sign up for free to submit.
      </p>
      <div className="flex justify-between mt-4">
        <Button onClick={() => router.push('/articles')}>Search Articles</Button>
        {!user && (
          <div className="flex gap-4">
            <Button variant="outline" className="border-black bg-transparent" onClick={() => router.push('/login')}>
              Sign In
            </Button>
            <Button variant="outline" className="border-black bg-transparent" onClick={() => router.push('/signup')}>
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
