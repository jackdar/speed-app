import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, Rating } from './article.schema';
import { CreateArticleDto } from './dto/create-article.dto';
import { RatingDto } from './dto/rating.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { RatingDto } from './dto/rating.dto';

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

  async updateArticle(
    id: string,
    updatedArticle: UpdateArticleDto,
  ): Promise<Article> {
    try {
      const newArticle: UpdateArticleDto = updatedArticle;
      newArticle.lastUpdateDate = new Date();
      await this.articleModel.findByIdAndUpdate(
        { _id: id },
        { $set: updatedArticle },
      );
      const updatedResult = await this.getArticleById(id);
      return updatedResult;
    } catch (error) {
      throw new BadRequestException('Failed to update article. ' + error);
    }
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
      throw new BadRequestException('Failed to create new article. ' + error);
    }
  }

  async rateArticle(id: string, ratingDto: RatingDto): Promise<Article> {
    try {
      const { userId, rating } = ratingDto;
      const currentDate = new Date();

      if (rating === 0) {
        return await this.articleModel.findOneAndUpdate(
          { _id: id, 'ratings.raterId': userId },
          { $pull: { ratings: { raterId: userId } } },
          { new: true },
        );
      }

      const article = await this.articleModel.findOneAndUpdate(
        { _id: id, 'ratings.raterId': userId },
        {
          $set: {
            'ratings.$.rating': rating,
            'ratings.$.ratedDate': currentDate,
          },
        },
        { upsert: false, new: true },
      );

      if (!article) {
        return await this.articleModel.findByIdAndUpdate(
          id,
          {
            $push: {
              ratings: { raterId: userId, rating, ratedDate: currentDate },
            },
          },
          { new: true },
        );
      }

      return article;
    } catch (error) {
      throw new BadRequestException('Failed to rate article. ' + error);
    }
  }
}
