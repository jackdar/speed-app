import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';

@Controller('api/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // GET /api/article
  @Get()
  async getArticles() {
    return await this.articleService.getArticles();
  }

  // GET /api/article/:id
  @Get(':id')
  async getArticleById(@Param('id') id: string) {
    return await this.articleService.getArticleById(id);
  }

  // POST /api/article/new
  @Post('new')
  async createArticle(@Body() createArticleDto: CreateArticleDto) {
    return await this.articleService.createArticle(createArticleDto);
  }
}
