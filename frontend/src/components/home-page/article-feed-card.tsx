'use client';

import { useAuth } from '@/hooks/use-auth';
import { Article, Rating } from '@/types';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

export default function ArticleFeedCard({ article }: { article: Article }) {
  const { user, token } = useAuth();

  const [ratings, setRatings] = useState<Rating[]>(article.ratings);
  const [userRating, setUserRating] = useState<number>(0);
  const [overallRating, setOverallRating] = useState<number>(0);

  useEffect(() => {
    setOverallRating(ratings.length === 0 ? 0 : ratings.map((rating) => rating.rating).reduce((a, b) => a + b, 0) / ratings.length);
    setUserRating(ratings.find((rating) => rating.raterId === user?._id)?.rating || 0);
  }, [ratings, user]);

  const handleRateArticle = async (rating: number) => {
    const originalRatings = ratings;
    if (userRating === rating) rating = 0;

    setRatings((prevRatings) => prevRatings.map((r) => (r.raterId === user?._id ? { ...r, rating } : r)));

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/${article._id}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, userId: user?._id }),
      });

      if (!response.ok) {
        throw new Error('Failed to rate article');
      }

      const updatedArticle = await response.json();
      setRatings(updatedArticle.ratings);
    } catch (error) {
      console.error(error);
      setRatings(originalRatings); // Revert to original ratings on error
    }
  };

  return (
    <div className="bg-gray-100 p-8 rounded shadow-md w-full">
      <h2 className="text-xl text-black mb-4 w-full text-start">{article.title}</h2>
      <p className="mb-4">
        Author: {article.author} | Publisher: {article.publisher} | Journal: {article.journal} | Year: {article.year} | Rating:{' '}
        {overallRating.toFixed(1)}
      </p>
      <p>Main Claim: {article.analysis?.summary || 'No claim'}</p>
      <p>Methodology: {article.analysis?.methodology || 'No methodology'}</p>
      <p>Key Findings: {article.analysis?.keyFindings || 'No key findings'}</p>
      <div className="flex justify-start mt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Button
            key={i}
            disabled={!user}
            variant="outline"
            className="shadow-none border-none bg-transparent hover:bg-transparent hover:scale-105 w-fit h-fit p-0 text-yellow-300 hover:text-yellow-400 disabled:text-gray-300"
            onClick={() => handleRateArticle(i + 1)}
          >
            <Star size={36} className={i < userRating ? 'fill-yellow-300' : ''} />
          </Button>
        ))}
      </div>
    </div>
  );
}
