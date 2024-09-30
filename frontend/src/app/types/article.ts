export interface Article {
  _id: string;
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
  updatedAt: string;
}
