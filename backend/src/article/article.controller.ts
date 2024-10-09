import { Controller, Get, Post, Param, Body, Request } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';

@Controller()
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
  ) { }


  @Get('articles')
  async getArticles() {
    return await this.articleService.getArticles();
  }

  @Get('/article/:id')
  async getArticleById(@Param('id') id: string) {
    return await this.articleService.getArticleById(id);
  }

  @Post('article/new')
  async addArticle(@Body() article: CreateArticleDto) {
    return await this.articleService.createArticle(article);
  }
}
