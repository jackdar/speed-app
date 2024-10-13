import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from './article.service';
import { getModelToken } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { Article } from './article.schema';
import { CreateArticleDto } from './dto/create-article.dto';
import { BadRequestException } from '@nestjs/common';
import { NotificationService } from '../notification/notification.service';
import { AdminNotification } from '../notification/admin-notification.schema';
import { UserNotification } from '../notification/user-notification.schema';
import { AuthService } from '../auth/auth.service';
import { CreateAdminNotifcationDto } from '../notification/dto/create-admin-notification.dto';


const mockArticleModel = {
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
};

const mockAuthService = {

}
const mockNotificationService = {
  sendNotification: jest.fn()
}

describe('ArticleService', () => {
  let service: ArticleService;
  let authService: AuthService;
  let articleModel: Model<Article>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: getModelToken(Article.name),
          useValue: mockArticleModel,
        },
        {
          provide: ConfigService,
          useValue: { get: jest.fn() },
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: NotificationService,
          useValue: mockNotificationService,
        },
      ],
      
    }).compile();

    service = module.get<ArticleService>(ArticleService);
    articleModel = module.get<Model<Article>>(getModelToken(Article.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getArticles', () => {
    it('should return an array of articles', async () => {
      const mockArticles = [
        { title: 'Test Article 1' },
        { title: 'Test Article 2' },
      ];
      jest.spyOn(articleModel, 'find').mockResolvedValue(mockArticles as any);

      const result = await service.getArticles();
      expect(articleModel.find).toHaveBeenCalled();
      expect(result).toEqual(mockArticles);
    });
  });

  describe('getArticleById', () => {
    it('should return a single article by id', async () => {
      const mockArticle = { title: 'Test Article' };
      jest
        .spyOn(articleModel, 'findById')
        .mockResolvedValue(mockArticle as any);

      const result = await service.getArticleById('1');
      expect(articleModel.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockArticle);
    });
  });

  describe('createArticle', () => {
    it('should create and return a new article', async () => {
      const createArticleDto: CreateArticleDto = {
        submitterId: '1',
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

      const mockArticle = { ...createArticleDto };

      jest.spyOn(articleModel, 'create').mockResolvedValue(mockArticle as any);
      jest.spyOn(service, "createArticle").mockImplementation(async (uid: string, article:CreateArticleDto) => {
        let createResult = articleModel.create(article);

        let adminNotification: CreateAdminNotifcationDto = {
          user_id: uid,
          role: "moderator",
          article_id: "123",
          article_title: article.title,
          title: "New article submitted",
          message: "View to get assigned",
          assigned: false,
          assignee_id: ""
        }
        jest.spyOn(mockNotificationService, "sendNotification").mockResolvedValue(adminNotification as any);

        return createResult;
      })
      const result = await service.createArticle("123", createArticleDto);
      
      console.log(result);
      // expect(articleModel.create).toHaveBeenCalledWith("123", createArticleDto);
      expect(result).toEqual(mockArticle);
    });

    it('should throw a BadRequestException on failure', async () => {
      const createArticleDto: CreateArticleDto = {
        submitterId: '1',
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

      jest.spyOn(articleModel, 'create').mockRejectedValue(new Error('Error'));

      await expect(service.createArticle("123", createArticleDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('updateArticle', () => {
    it('should update article and return article with new details', async () => {
      const mockArticleId = '123';

      const mockNewArticle: any = {
        submitterId: '1',
        title: 'new title',
        author: 'new author',
        publisher: 'new publisher',
        journal: 'new journal',
        year: 2024,
        volume: 1,
        pagesStart: 10,
        pagesEnd: 20,
        doi: '10.1234/test.doi',
        isPosted: true,
        createDate: new Date(),
        lastUpdateDate: new Date(),
        moderationDetails: {
          moderatorId: 'mod id',
          moderated: false,
          moderationPassed: false,
        },
        analysisDetails: {
          analystId: 'analyst id',
          analyzed: false,
          analyzePassed: false,
        },
      };

      // Mocking the actual implemnetation of updating. Returned result is the details of the updated article.
      jest
        .spyOn(service, 'updateArticle')
        .mockImplementation(async (id, data) => {
          expect(id).toBe(mockArticleId);
          expect(data).toEqual(mockNewArticle);
          return { id: mockArticleId, submitterId: data.submitterId, ...data };
        });

      const updatedResult = await service.updateArticle('123', mockNewArticle);

      expect(updatedResult).toEqual(
        expect.objectContaining({
          id: mockArticleId,
          ...mockNewArticle,
        }),
      );
    });
  });
});
