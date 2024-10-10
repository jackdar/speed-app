import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from '../article/article.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
  ) {}

  async getModeratorQueue(): Promise<any> {
    return await this.articleModel.find({
      'moderationDetails.moderated': false,
    });
  }

  async getAnalystQueue(): Promise<any> {
    return await this.articleModel.find({
      'moderationDetails.moderated': true,
      'moderationDetails.moderation_passed': true,
      'analysisDetails.analyzed': false,
    });
  }
}
