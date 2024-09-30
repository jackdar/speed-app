import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UsersService } from './user.service';

const mockUsersService = {
  findById: jest.fn(),
  updateUser: jest.fn(),
};

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUser', () => {
    it('should return a user by id', async () => {
      const mockUser = {
        id: '1',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        role: 'registered',
      };

      jest.spyOn(mockUsersService, 'findById').mockResolvedValue(mockUser);

      const result = await controller.getUser('1');
      expect(mockUsersService.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockUser);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const updateDto = { name: 'Updated Name' };
      const mockUpdatedUser = {
        id: '1',
        firstName: 'Updated',
        lastName: 'Name',
        email: 'test@example.com',
        role: 'registered',
      };

      jest
        .spyOn(mockUsersService, 'updateUser')
        .mockResolvedValue(mockUpdatedUser);

      const result = await controller.updateUser('1', updateDto);
      expect(mockUsersService.updateUser).toHaveBeenCalledWith('1', updateDto);
      expect(result).toEqual(mockUpdatedUser);
    });
  });
});
