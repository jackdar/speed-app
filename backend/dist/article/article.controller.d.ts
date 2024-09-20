import { ArticleService } from './article.service';
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    getArticles(): Promise<import("./article.schema").Article[]>;
    getArticleById(id: string): Promise<import("./article.schema").Article>;
}
