import { Controller, Get, Post, Param, Body, Headers } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';
import { AuthService } from '../auth/auth.service';

@Controller()
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly authService: AuthService
  ) { }

  @Get('articles')
  async getArticles() {
    return await this.articleService.getArticles();
  }

  @Get('/articles/:id')
  async getArticleById(@Param('id') id: string) {
    return await this.articleService.getArticleById(id);
  }

  @Post('articles/new')
  async addArticle(
    @Headers() headers: Headers, 
    @Body() article: CreateArticleDto) {
    let token = headers["authorization"];
    let decoded = null;
    if(token) {
      token = token.replace("Bearer ", "");
      decoded = await this.authService.verify(token);
    }

    return await this.articleService.createArticle(decoded?.uid, article);
  }
}
