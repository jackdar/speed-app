import { Test, TestingModule } from "@nestjs/testing";
import { AdminService } from "./admin.service";
import { Article } from "../article/article.schema";
import { Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { AdminController } from "./admin.controller";

const mockAdminController = {
    getModeratorQueue: jest.fn(),
    getAnalystQueue: jest.fn()
};

describe('AdminService', () => {
    let service: AdminService;
    let articleModel: Model<Article>

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AdminService,
                {
                    provide: getModelToken(Article.name),
                    useValue: mockAdminController
                }
            ]
        }).compile();

        service = module.get<AdminService>(AdminService);
        articleModel = module.get<Model<Article>>(getModelToken(Article.name));
    })

    it('should be defined', () => {
        expect(service).toBeDefined(); 
    })

    describe('getModeratorQueue', async () => {
        it('should return an array of articles', async () => {
            const mockArticles = [
                {
                    title: 'Not Moderated',
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
                    "moderationDetails": {
                        "moderatorID": "moderator id",
                        "moderated": false,
                        "moderation_passed": false
                      },
                      "analysisDetails": {
                        "analystID": "analyst id",
                        "analyzed": false,
                        "analyzed_passed": false
                      }
                },
                {title: 'Test Article 2'}
            ];
            jest.spyOn(articleModel, 'find')
        })
    })
})

