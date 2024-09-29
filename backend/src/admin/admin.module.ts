import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Article, ArticleSchema } from "src/article/article.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Article.name,
                schema: ArticleSchema,
            },
        ]),
    ],
    controllers: [AdminController],
    providers: [AdminService],
    exports: [AdminService],
})

export class AdminModule { };