import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const mockAuthService = {
  login: jest.fn(),
  register: jest.fn(),
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a token on successful login', async () => {
      const login = { email: 'test@example.com', password: 'password' };
      const mockToken = { access_token: 'jwt-token' };

      jest.spyOn(mockAuthService, 'login').mockResolvedValue(mockToken);

      const result = await controller.login(login);
      expect(mockAuthService.login).toHaveBeenCalledWith(
        login.email,
        login.password,
      );
      expect(result).toEqual(mockToken);
    });
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const user = {
        email: 'test@example.com',
        password: 'password',
        firstName: 'Test',
        lastName: 'User',
      };
      const mockUser = { id: '1', ...user };

      jest.spyOn(mockAuthService, 'register').mockResolvedValue(mockUser);

      const result = await controller.register(user);
      expect(mockAuthService.register).toHaveBeenCalledWith(user);
      expect(result).toEqual(mockUser);
    });
  });

  describe('profile', () => {
    it('should return the user profile', async () => {
      const mockRequest = {
        user: { id: '1', email: 'test@example.com', role: 'registered' },
      };

      const result = await controller.getProfile(mockRequest);
      expect(result).toEqual(mockRequest.user);
    });
  });
});
