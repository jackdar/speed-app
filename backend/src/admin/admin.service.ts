import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from '../article/article.schema';
import { ModerateArticleDto } from './types/moderate-article.dto';
import { NotificationService } from '../notification/notification.service';
import { CreateUserNotificationDto } from '../notification/dto/create-user-notification.dto';
import { ArticleService } from '../article/article.service';
import { AnalyseArticleDto } from './types/analyse-article.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
    private readonly notificationService: NotificationService,
    private readonly articleService: ArticleService
  ) { }

  async getModeratorQueue(): Promise<any> {
    return await this.articleModel.find({
      'moderation.moderated': false,
    });
  }

  async getAnalystQueue(): Promise<any> {
    return await this.articleModel.find({
      'moderation.moderated': true,
      'moderation.moderation_passed': true,
      'analysis.analyzed': false,
    });
  }

  async moderateArticle({ articleId, moderationDetails }: ModerateArticleDto): Promise<any> {
    try {
      const updatedResult = await this.articleService.moderateArticle(articleId, moderationDetails);
      const userNotification: CreateUserNotificationDto = {
        user_id: updatedResult.submitterId.toString(),
        article_id: "123",
        article_title: "Rubbish",
        title: `Your article has been ${moderationDetails.status}`,
        message: `${moderationDetails.status == 'approved' ? "Congratulations, your article has been approved and now pending analysis." : "Rejected lmao"}`,
        read: false
      }
      this.notificationService.sendNotification(userNotification);
      return { message: "Successfuly moderated article" };

    } catch (error) {
      return { message: "Error in moderating article, try again or try later" }
    }
  }

  async analyseArticle({ articleId, analysisDetails }: AnalyseArticleDto): Promise<any> {
    try {
      const updatedResult = await this.articleService.analyseArticle(articleId, analysisDetails);
      const userNotification: CreateUserNotificationDto = {
        user_id: updatedResult.submitterId.toString(),
        article_id: "123",
        article_title: "Rubbish",
        title: `Your article has been ${analysisDetails.status}`,
        message: `${analysisDetails.status == 'completed' ? "Congratulations, your article has been analysed and is now visible" : "Rejected lmao"}`,
        read: false
      }
      this.notificationService.sendNotification(userNotification);
      return { message: "Successfuly moderated article" };

    } catch (error) {
      return { message: "Error in moderating article, try again or try later" }
    }
  }
}
