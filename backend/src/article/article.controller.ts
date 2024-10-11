
import { Controller, Get, Post, Put, Param, Body, Headers } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { AuthService } from '../auth/auth.service';
import { RatingDto } from './dto/rating.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller()
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly authService: AuthService
  ) { }

  @Get('/articles')
  async getArticles() {
    return await this.articleService.getArticles();
  }

  @Get('/articles/:id')
  async getArticleById(@Param('id') id: string) {
    return await this.articleService.getArticleById(id);
  }

  @Put('/article/:id')
  async updateArticleStatus(
    @Param('id') id: string,
    @Body() updatedArticle: UpdateArticleDto,
  ) {
    return await this.articleService.updateArticle(id, updatedArticle);
  }

  @Post('/article/:id/rate')
  async rateArticle(@Body() ratingDto: RatingDto, @Param('id') id: string) {
    console.log(ratingDto);
    return await this.articleService.rateArticle(id, ratingDto);
  }

  @Get('/article/:id/ratings')
  async getArticleRatings(@Param('id') id: string) {
    return await this.articleService.getArticleRatings(id);
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
      console.log(decoded);
    }
    return await this.articleService.createArticle(decoded?.uid, article);
  }
}