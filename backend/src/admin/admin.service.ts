import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Article } from "src/article/article.schema";

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(Article.name) private articleModel: Model<Article>,
        private configService: ConfigService,
    ) { }

    async getArticleQueue(): Promise<Article[]> {
        return await this.articleModel.find({ "moderationDetails.moderated": false });

    }

    async getAnalystQueue(): Promise<Article[]> {
        return await this.articleModel.find({ "moderationDetails.moderated": true, "moderationDetails.moderation_passed": true, "analysisDetails.analyzed": false })
    }
}