import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { RatingDto } from './dto/rating.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller()
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly usersService: UsersService,
  ) {}

  @Get('/articles')
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
    @Body() updatedArticle: UpdateArticleDto,
  ) {
    return await this.articleService.updateArticle(id, updatedArticle);
  }

  @Post('/article/:id/rate')
  async rateArticle(@Body() ratingDto: RatingDto, @Param('id') id: string) {
    await this.usersService.rateArticle(ratingDto.userId, id, ratingDto.rating);
    return await this.articleService.rateArticle(id, ratingDto);
  }

  @Post('/article/new')
  async addArticle(@Body() createArticleDto: CreateArticleDto) {
    return await this.articleService.createArticle(createArticleDto);
  }
}
