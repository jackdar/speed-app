import { Article } from './article.schema';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
export declare class ArticleService {
    private articleModel;
    private configService;
    constructor(articleModel: Model<Article>, configService: ConfigService);
    getArticles(): Promise<Article[]>;
    getArticleById(id: string): Promise<Article>;
}
