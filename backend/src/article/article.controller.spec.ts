import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';
import { Article } from './article.schema';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './create-article.dto';

const mockArticleService = {
  getArticles: jest.fn(),
  getArticleById: jest.fn(),
  createArticle: jest.fn(),
};

describe('ArticleController', () => {
  let controller: ArticleController;
  let service: ArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        {
          provide: ArticleService,
          useValue: mockArticleService,
        },
      ],
    }).compile();

    controller = module.get<ArticleController>(ArticleController);
    service = module.get<ArticleService>(ArticleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getArticles', () => {
    it('should return an array of articles', async () => {
      const mockArticles: Article[] = [
        {
          title: 'Title',
          author: 'Author',
          publisher: 'Publisher',
          journal: 'Journal',
          year: 2024,
          volume: 1,
          pagesStart: 1,
          pagesEnd: 10,
          doi: '10.1234/test.doi',
          isPosted: true,
          createDate: new Date(),
          lastUpdateDate: new Date(),
          moderationDetails: {
            moderatorId: '123',
            moderated: true,
            moderationPassed: true,
          },
          analysisDetails: {
            analystId: '123',
            analyzed: true,
            analyzePassed: true,
          },
        },
        {
          title: 'Title 2',
          author: 'Author 2',
          publisher: 'Publisher 2',
          journal: 'Journal 2',
          year: 2020,
          volume: 2,
          pagesStart: 11,
          pagesEnd: 20,
          doi: '10.1234/test2.doi',
          isPosted: true,
          createDate: new Date(),
          lastUpdateDate: new Date(),
          moderationDetails: {
            moderatorId: '321',
            moderated: false,
            moderationPassed: false,
          },
          analysisDetails: {
            analystId: '321',
            analyzed: false,
            analyzePassed: false,
          },
        },
      ];

      jest.spyOn(service, 'getArticles').mockResolvedValue(mockArticles);

      const result = await controller.getArticles();
      expect(service.getArticles).toHaveBeenCalled();
      expect(result).toEqual(mockArticles);
    });
  });

  describe('getArticleById', () => {
    it('should return a single article', async () => {
      const mockArticle: Article = {
        title: 'Title',
        author: 'Author',
        publisher: 'Publisher',
        journal: 'Journal',
        year: 2024,
        volume: 1,
        pagesStart: 1,
        pagesEnd: 10,
        doi: '10.1234/test.doi',
        isPosted: true,
        createDate: new Date(),
        lastUpdateDate: new Date(),
        moderationDetails: {
          moderatorId: '123',
          moderated: true,
          moderationPassed: true,
        },
        analysisDetails: {
          analystId: '123',
          analyzed: true,
          analyzePassed: true,
        },
      };

      jest.spyOn(service, 'getArticleById').mockResolvedValue(mockArticle);

      const result = await controller.getArticleById('1');
      expect(service.getArticleById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockArticle);
    });
  });

  describe('addArticle', () => {
    it('should create a new article', async () => {
      const createArticleDto: CreateArticleDto = {
        title: 'New Article',
        author: 'New Author',
        publisher: 'New Publisher',
        journal: 'New Journal',
        year: 2024,
        volume: 1,
        pagesStart: 10,
        pagesEnd: 20,
        doi: '10.1234/test.doi',
        isPosted: true,
        dateCreated: new Date(),
        dateUpdated: new Date(),
      };

      const mockArticle: Article = {
        ...createArticleDto,
        createDate: new Date(),
        lastUpdateDate: new Date(),
        moderationDetails: {
          moderatorId: '123',
          moderated: false,
          moderationPassed: false,
        },
        analysisDetails: {
          analystId: '123',
          analyzed: false,
          analyzePassed: false,
        },
      };

      jest.spyOn(service, 'createArticle').mockResolvedValue(mockArticle);

      const result = await controller.addArticle(createArticleDto);
      expect(service.createArticle).toHaveBeenCalledWith(createArticleDto);
      expect(result).toEqual(mockArticle);
    });
  });
});
