import { Controller, Get, Post, Param, Headers, Body, Put } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';
import { Article } from './article.schema';
import { UpdateArticleDto } from './update-article.dto';

@Controller()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @Get('articles')
  async getArticles() {
    return await this.articleService.getArticles();
  }

  @Get('/article/:id')
  async getArticleById(@Param('id') id: string) {
    return await this.articleService.getArticleById(id);
  }

  @Put('/article/:id')
  async updateArticleStatus(
    @Param('id') id: string,
    @Body() updatedArticle: UpdateArticleDto
  ) {
    return await this.articleService.updateArticle(id, updatedArticle);
  }

  @Post('article/new')
  async addArticle(@Body() createArticleDto: CreateArticleDto) {
    return await this.articleService.createArticle(createArticleDto);
  }

}
