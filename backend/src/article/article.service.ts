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
  ) { }

  async getArticles(): Promise<Article[]> {
    return await this.articleModel.find();
  }

  async getArticleById(id: string): Promise<Article> {
    return await this.articleModel.findById(id);
  }

  async updateArticle(id: string, updatedArticle: Article): Promise<any> {
    try {
      let newArticle: Article = updatedArticle;
      newArticle.lastUpdateDate = new Date();
      // await this.articleModel.findByIdAndUpdate({ _id: id }, { $set: updatedArticle });
      // const updatedResult = await this.getArticleById(id);
      // console.log(updatedArticle);
      return { "hi": "hi" };

    } catch (error) {
      throw new BadRequestException("Failed to update article. " + error);
    }
  }

  async createArticle(createArticleDto: CreateArticleDto): Promise<Article> {
    try {
      const createResult = await this.articleModel.create(createArticleDto);
      return createResult;
    } catch (error) {
      throw new BadRequestException("Failed to create new article. " + error);
    }
  }
}
