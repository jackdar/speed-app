import { UserDto } from './user.dto';

export class UpdateUserDto implements Omit<Partial<UserDto>, 'id'> {}
