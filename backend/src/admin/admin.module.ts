import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Article, ArticleSchema } from "../article/article.schema";
import { ArticleModule } from "src/article/article.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Article.name,
                schema: ArticleSchema,
            },
        ]),
        ArticleModule
    ],
    controllers: [AdminController],
    providers: [AdminService],
    exports: [AdminService],
})

export class AdminModule { };