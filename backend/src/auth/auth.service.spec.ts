import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserDto } from '../user/dto/user.dto';
import { UsersService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

const mockUsersService = {
  findByEmail: jest.fn(),
  validatePassword: jest.fn(),
  register: jest.fn(),
  updateUser: jest.fn(),
};

const mockJwtService = {
  signAsync: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        ConfigService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return a token if login is successful', async () => {
      const mockUser: UserDto = {
        _id: 'testid',
        email: 'test@example.com',
        password: 'hashedPassword',
        role: 'registered',
        firstName: 'Test',
        lastName: 'User',
        refreshToken: 'refresh-token',
        articlesPublished: [],
        articlesModerated: [],
        articlesAnalysed: [],
        articlesRated: [],
      };

      const login: LoginDto = {
        email: 'test@example.com',
        password: 'strongPassword',
      };

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser);
      jest.spyOn(usersService, 'validatePassword').mockResolvedValue(true);
      // jest.spyOn(service, "getTokens").mockResolvedValue({accessToken: "access_token", refreshToken: "refresh_token"})
      jest.spyOn(jwtService, 'signAsync')
        .mockResolvedValueOnce("access_token")
        .mockResolvedValue("refresh_token");

      const result = await service.login(login.email, login.password);
      expect(usersService.findByEmail).toHaveBeenCalledWith(login.email);
      expect(usersService.validatePassword).toHaveBeenCalledWith(
        login.password,
        mockUser.password,
      );
      expect(mockJwtService.signAsync.mock.calls[0]).toEqual(
        [
          { uid: mockUser._id, email: mockUser.email, role: mockUser.role },
          { secret: undefined, expiresIn: '15m' }
        ]
      );
      expect(mockJwtService.signAsync.mock.calls[1]).toEqual(
        [
          { uid: mockUser._id, email: mockUser.email, role: mockUser.role },
          { secret: undefined, expiresIn: '1d' }
        ]
      );
     
      expect(result).toEqual({ access_token: 'access_token', refresh_token: 'refresh_token' });
    });

    it('should throw an UnauthorizedException if user not found', async () => {
      const login: LoginDto = {
        email: 'test@example.com',
        password: 'strongPassword',
      };

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);

      await expect(service.login(login.email, login.password)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw an UnauthorizedException if password is invalid', async () => {
      const mockUser: UserDto = {
        _id: 'testid',
        email: 'test@example.com',
        password: 'hashedPassword',
        role: 'registered',
        firstName: 'Test',
        lastName: 'User',
        refreshToken: '123',
        articlesPublished: [],
        articlesModerated: [],
        articlesAnalysed: [],
        articlesRated: [],
      };
      const login = {
        email: 'test@example.com',
        password: 'strongPassword',
      };

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser);
      jest.spyOn(usersService, 'validatePassword').mockResolvedValue(false);

      await expect(service.login(login.email, login.password)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('register', () => {
    it('should register a user successfully', async () => {
      const mockUser: UserDto = {
        _id: 'testid',
        email: 'test@example.com',
        password: 'hashedPassword',
        role: 'registered',
        firstName: 'Test',
        lastName: 'User',
        refreshToken: '123',
        articlesPublished: [],
        articlesModerated: [],
        articlesAnalysed: [],
        articlesRated: [],
      };

      const user: CreateUserDto = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'strongPassword',
      };

      jest.spyOn(usersService, 'register').mockResolvedValue(mockUser);

      const result = await service.register(user);
      expect(usersService.register).toHaveBeenCalledWith(user);
      expect(result).toEqual(mockUser);
    });
  });
});
