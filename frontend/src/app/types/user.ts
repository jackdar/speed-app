export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "guest" | "registered" | "moderator" | "analyst" | "admin";
  articlesPublished: string[];
  articlesModerated: string[];
  articlesAnalysed: string[];
  articlesRated: Array<{ articleId: string; rating: number }>;
}
