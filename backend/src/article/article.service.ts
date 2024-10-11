import { BadRequestException, Injectable } from '@nestjs/common';
import { Article } from './article.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from './create-article.dto';
import { CreateAdminNotifcationDto } from '../notification/dto/create-admin-notification.dto';
import { NotificationService } from '../notification/notification.service';
import { CreateUserNotificationDto } from 'src/notification/dto/create-user-notification.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
    private notificationService: NotificationService,
  ) { }

  async getArticles(): Promise<Article[]> {
    return await this.articleModel.find();
  }

  async getArticleById(id: string): Promise<Article> {
    return await this.articleModel.findById(id);
  }

  async createArticle(uid: string ="no user", article: CreateArticleDto): Promise<Article> {
    try {
      const createResult = await this.articleModel.create(article);
      console.log(uid);
      // Need to replace user_email with one retrieved from submitter
      let adminNotification: CreateAdminNotifcationDto = {
        user_id: uid,
        role: "moderator",
        article_id: createResult._id.toString(),
        article_title: createResult.title.toString(),
        title: "New article submitted",
        message: "View to get assigned",
        assigned: false,
        assignee_id: ""
      }
      if(createResult){
        await this.notificationService.sendNotification(adminNotification);
      }
      return createResult;
    } catch (error) {
      throw new BadRequestException("Failed to create new article. " + error);
    }
  }
}
