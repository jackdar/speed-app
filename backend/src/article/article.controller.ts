import { Controller, Get, Param } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('articles')
  async getArticles() {
    return await this.articleService.getArticles();
  }

  @Get('/article/:id')
  async getArticleById(@Param('id') id: string) {
    return await this.articleService.getArticleById(id);
  }
}
