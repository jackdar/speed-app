export interface Article {
  id: string;
  title: string;
  author: string;
  publisher: string;
  journal: string;
  doi: string;
  isPosted: false;
  pagesEnd: number;
  pagesStart: number;
  volume: number;
  year: number;
  createdAt: string;
  updatedAt: string;
}
