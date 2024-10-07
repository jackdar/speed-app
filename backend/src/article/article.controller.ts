import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';
import { UpdateArticleDto } from './update-article.dto';

@Controller()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('/articles')
  async getArticles() {
    return await this.articleService.getArticles();
  }

  // GET /api/article/:id
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

  @Post('/article/new')
  async addArticle(@Body() createArticleDto: CreateArticleDto) {
    return await this.articleService.createArticle(createArticleDto);
  }
}
