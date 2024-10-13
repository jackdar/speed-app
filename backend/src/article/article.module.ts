import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { ArticleController } from './article.controller';
import { Article, ArticleSchema } from './article.schema';
import { NotificationModule } from '../notification/notification.module';
import { AuthModule } from '../auth/auth.module';
import { ArticleService } from './article.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Article.name,
        schema: ArticleSchema,
      },
    ]),
    UserModule,
    NotificationModule,
    AuthModule,
  ],
  
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
