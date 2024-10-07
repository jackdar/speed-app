import { BadRequestException, Injectable } from '@nestjs/common';
import { Article } from './article.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from './create-article.dto';
import { CreateAdminNotifcationDto } from 'src/notification/dto/create-admin-notification.dto';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
    private notificationService: NotificationService,
  ) {}

  async getArticles(): Promise<Article[]> {
    return await this.articleModel.find();
  }

  async getArticleById(id: string): Promise<Article> {
    return await this.articleModel.findById(id);
  }

  async createArticle(createArticleDto: CreateArticleDto): Promise<{statusCode: number, data: Article}> {
    try {
      // const createResult = await this.articleModel.create(createArticleDto);
      let tempArt: any = {
        title: "hello"
      };
      // This will change to the article details
      
      let temp: CreateAdminNotifcationDto = {
        user_id: "123",
        role: "moderator",
        article_id: "456",
        article_title: "COVID-19 and multiorgan response",
        title: "New article submitted",
        message: "View to get assigned",
        assigned: false
      }
      await this.notificationService.sendNotification(temp);
      return tempArt;
    } catch (error) {
      throw new BadRequestException("Failed to create new article. " + error);
    }
  }
}
