import { BadRequestException, Injectable } from '@nestjs/common';
import { Article } from './article.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { CreateArticleDto } from './create-article.dto';

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

  async createArticle(createArticleDto: CreateArticleDto): Promise<Article> {
    try {
      const currentDate = new Date();
      const createResult = await this.articleModel.create({
        ...createArticleDto,
        dateCreated: createArticleDto.dateCreated || currentDate,
        dateUpdated: createArticleDto.dateUpdated || currentDate,
      });
      return createResult;
    } catch (error) {
      throw new BadRequestException("Failed to create new article. " + error);
    }
  }
  
}
