import { Injectable } from '@nestjs/common';
import { Article } from './article.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
    private configService: ConfigService,
  ) {}

  async getArticles(): Promise<Article[]> {
    return await this.articleModel.find();
  }

  async getArticleById(id: string): Promise<Article> {
    return await this.articleModel.findById(id);
  }
}
