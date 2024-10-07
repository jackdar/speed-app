import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UsersService } from './user.service';

const mockUser: any = {
  _id: '1',
  email: 'test@example.com',
  password: 'hashedPassword',
  role: 'registered',
  firstName: 'Test',
  lastName: 'User',
  articlesPublished: [],
  articlesModerated: [],
  articlesAnalysed: [],
  articlesRated: [],
};

const mockUserModel = {
  findOne: jest.fn().mockImplementation(() => ({
    exec: jest.fn().mockResolvedValue(mockUser),
  })),
  findById: jest.fn().mockImplementation(() => ({
    exec: jest.fn().mockResolvedValue(mockUser),
  })),
  create: jest.fn().mockResolvedValue(mockUser),
  findByIdAndUpdate: jest.fn().mockResolvedValue(mockUser),
};

describe('UsersService', () => {
  let service: UsersService;
  let userModel: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      jest.spyOn(userModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser),
      } as any);

      const result = await service.findByEmail('test@example.com');
      expect(userModel.findOne).toHaveBeenCalledWith({
        email: 'test@example.com',
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('register', () => {
    it('should hash the password and save a new user', async () => {
      const userDto = {
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        password: 'password',
        role: 'registered',
      };

      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
      jest.spyOn(userModel, 'create').mockResolvedValue(mockUser);

      const result = await service.register(userDto);
      expect(bcrypt.hash).toHaveBeenCalledWith(userDto.password, 10);
      expect(userModel.create).toHaveBeenCalledWith({
        ...userDto,
        password: 'hashedPassword',
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('validatePassword', () => {
    it('should return true for valid passwords', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      const result = await service.validatePassword(
        'password',
        'hashedPassword',
      );
      expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedPassword');
      expect(result).toBe(true);
    });

    it('should return false for invalid passwords', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      const result = await service.validatePassword(
        'password',
        'hashedPassword',
      );
      expect(result).toBe(false);
    });
  });
});
