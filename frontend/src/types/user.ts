import { Article } from './article';

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'guest' | 'registered' | 'moderator' | 'analyst' | 'admin';
  bio: string;
  articlesSubmitted: Article[];
  articlesModerated: Article[];
  articlesAnalysed: Article[];
  articlesRated: Array<{ articleId: string; rating: number }>;
};
