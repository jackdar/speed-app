import { Analysis, Moderation } from './article.schema';

export class UpdateArticleDto {
  title: string;
  author: string;
  publisher: string;
  journal: string;
  year: number;
  volume: number;
  pagesStart: number;
  pagesEnd: number;
  doi: string;
  isPosted: boolean;
  createDate: Date;
  lastUpdateDate: Date;
  moderationDetails: Moderation;
  analysisDetails: Analysis;
}
