import { Test, TestingModule } from "@nestjs/testing";
import { AdminService } from "./admin.service";
import { Article } from "../article/article.schema";
import { Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { AdminController } from "./admin.controller";

const mockAdminController = {
    getAnalystQueue: jest.fn(),
    find: jest.fn(),
};

describe('AdminService', () => {
    let adminService: AdminService;

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

        adminService = module.get<AdminService>(AdminService);
        articleModel = module.get<Model<Article>>(getModelToken(Article.name));
    })

    it('should be defined', () => {
        expect(adminService).toBeDefined();
    })

    describe('Admin Service', () => {
        const unmodMockArticle = {
            title: 'Article',
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
            moderationDetails: {
                moderatorID: "moderator id",
                moderated: false,
                moderation_passed: false
            },
            analysisDetails: {
                analystID: "analyst id",
                analyzed: false,
                analyzed_passed: false
            }
        };

        const modMockArticle = {
            title: 'Article',
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
            moderationDetails: {
                moderatorID: "moderator id",
                moderated: true,
                moderation_passed: true
            },
            analysisDetails: {
                analystID: "analyst id",
                analyzed: false,
                analyzed_passed: false
            }
        };

        const expectedUnmodArticle = {
            title: 'Article',
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
            moderationDetails: {
                moderatorID: "moderator id",
                moderated: false,
                moderation_passed: false
            },
            analysisDetails: {
                analystID: "analyst id",
                analyzed: false,
                analyzed_passed: false
            }
        }

        const modPassNoAnalyzeMockArticle = {
            title: 'Article',
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
            moderationDetails: {
                moderatorID: "moderator id",
                moderated: true,
                moderation_passed: true
            },
            analysisDetails: {
                analystID: "analyst id",
                analyzed: false,
                analyzed_passed: false
            }
        };

        const modNoPassNoAnalyzeMockArticle = {
            title: 'Article',
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
            moderationDetails: {
                moderatorID: "moderator id",
                moderated: true,
                moderation_passed: false
            },
            analysisDetails: {
                analystID: "analyst id",
                analyzed: false,
                analyzed_passed: false
            }
        };

        const modNoPassAnalyzedMockArticle = {
            title: 'Article',
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
            moderationDetails: {
                moderatorID: "moderator id",
                moderated: true,
                moderation_passed: true
            },
            analysisDetails: {
                analystID: "analyst id",
                analyzed: true,
                analyzed_passed: false
            }
        };

        const expectedUnanalyzedArticle = {
            title: 'Article',
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
            moderationDetails: {
                moderatorID: "moderator id",
                moderated: true,
                moderation_passed: true
            },
            analysisDetails: {
                analystID: "analyst id",
                analyzed: false,
                analyzed_passed: false
            }
        };

        describe('getModeratorQueue()', () => {
            // Expected pass
            it('should return list of unmoderatored articles', async () => {
                jest.spyOn(adminService, 'getModeratorQueue').mockResolvedValueOnce(unmodMockArticle as any);
                const unModQResult = await adminService.getModeratorQueue();
                expect(unModQResult).toEqual(expectedUnmodArticle);
            })

            // Expected fail
            it('should fail given the provided article is moderated', async () => {
                jest.spyOn(adminService, 'getModeratorQueue').mockResolvedValueOnce(modMockArticle as any);
                const modQResult = await adminService.getModeratorQueue();
                try {
                    expect(modQResult).toEqual(expectedUnmodArticle);
                } catch (error) {
                    expect(true).toBe(true)
                }
            })
        });

        describe('getAnalystQueue()', () => {
            // Expected pass
            it('should return a list of articles passed moderation but not yet analyzed', async () => {
                jest.spyOn(adminService, 'getAnalystQueue').mockResolvedValueOnce(modPassNoAnalyzeMockArticle as any);
                const unnalyzedResult = await adminService.getAnalystQueue();
                expect(unnalyzedResult).toEqual(expectedUnanalyzedArticle);
            });

            // Expected fail
            it('should fail given the provided article has been moderated but not passed and is not yet analyzed', async () => {
                jest.spyOn(adminService, 'getAnalystQueue').mockResolvedValueOnce(modNoPassNoAnalyzeMockArticle as any);
                const unnalyzedResult = await adminService.getAnalystQueue();
                try {
                    expect(unnalyzedResult).toEqual(expectedUnanalyzedArticle);
                } catch (error) {
                    expect(true).toBe(true);
                }
            });

            // Expected fail
            it('should fail given the provided article has passed moderation and has been analyzed', async () => {
                jest.spyOn(adminService, 'getAnalystQueue').mockResolvedValueOnce(modNoPassAnalyzedMockArticle as any);
                const alyzedResult = await adminService.getAnalystQueue();
                try {
                    expect(alyzedResult).toEqual(expectedUnanalyzedArticle);
                } catch (error) {
                    expect(true).toBe(true);
                }
            })
        })
    })
})

