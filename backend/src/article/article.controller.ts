import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../user/user.service';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { RatingDto } from './dto/rating.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { CreateAnalysisDto } from './dto/create-analysis.dto';

@Controller()
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

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
    await this.usersService.rateArticle(ratingDto.userId, id, ratingDto.rating);
    return await this.articleService.rateArticle(id, ratingDto);
  }

  @Get('/article/:id/ratings')
  async getArticleRatings(@Param('id') id: string) {
    return await this.articleService.getArticleRatings(id);
  }

  @Post('articles/new')
  async addArticle(
    @Headers() headers: Headers,
    @Body() article: CreateArticleDto,
  ) {
    let token = headers['authorization'];
    let decoded = null;
    if (token) {
      token = token.replace('Bearer ', '');
      decoded = await this.authService.verify(token);
      console.log(decoded);
    }
    return await this.articleService.createArticle(decoded?.uid, article);
  }

  @Post('/articles/:id/analysis/approve')
  async approveArticleAnalysis(
    @Param('id') id: string,
    @Body() analysisData: CreateAnalysisDto,
    @Headers('authorization') authHeader: string,
  ) {
    const token = authHeader.replace('Bearer ', '');
    const decoded = await this.authService.verify(token);

    return await this.articleService.approveAnalysis(
      id,
      decoded.uid,
      analysisData,
    );
  }

  @Post('/articles/:id/analysis/reject')
  async rejectArticleAnalysis(
    @Param('id') id: string,
    @Headers('authorization') authHeader: string,
  ) {
    const token = authHeader.replace('Bearer ', '');
    const decoded = await this.authService.verify(token);

    return await this.articleService.rejectAnalysis(id, decoded.uid);
  }
}
