import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from '../article/article.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
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
}
