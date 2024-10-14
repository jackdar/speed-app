'use client';

import { useAuth } from '@/hooks/use-auth';
import { Article, Rating } from '@/types';
import { TabsContent } from '@radix-ui/react-tabs';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableRow } from '../ui/table';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

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

    setRatings((prevRatings) =>
      rating === 0
        ? prevRatings.filter((r) => r.raterId !== user?._id)
        : prevRatings.map((r) => (r.raterId === user?._id ? { ...r, rating } : r)),
    );

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
      setRatings(originalRatings);
    }
  };

  return (
    <Card className='rounded'>
      <CardHeader>
        <CardTitle>{article.title}</CardTitle>
        <CardDescription>{article.author}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <Table>
          <TableBody>
            <TableRow>
              <TableHead>Publisher</TableHead>
              <TableCell>{article.publisher}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Journal</TableHead>
              <TableCell>{article.journal}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Year</TableHead>
              <TableCell>{article.year}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Methodology</TableHead>
              <TableCell>{article.analysis?.methodology || 'No methodology stated'}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>Overall Rating</TableHead>
              <TableCell>{overallRating.toFixed(1)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {article.analysis?.analysed && (
          <Tabs defaultValue="claim" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              {article.analysis?.summary && <TabsTrigger value="claim">Claim</TabsTrigger>}
              {article.analysis?.keyFindings && <TabsTrigger value="findings">Key Findings</TabsTrigger>}
            </TabsList>
            <TabsContent value="claim">
              <p>{article.analysis?.summary || 'No claim entered'}</p>
            </TabsContent>
            <TabsContent value="findings">
              <p>{article.analysis?.keyFindings?.join(', ') || 'No key findings'}</p>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      <CardFooter className="flex justify-start">
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
      </CardFooter>
    </Card>
  );
}
