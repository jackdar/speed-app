import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { UsersService } from '../user/user.service';
import { JwtAccessToken } from './types/Jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async register(userDto: CreateUserDto): Promise<UserDto> {
    return this.usersService.register(userDto);
  }

  async login(email: string, password: string): Promise<JwtAccessToken> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await this.usersService.validatePassword(
      password,
      user.password,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    const payload = { uid:user._id, email: user.email, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verify(token: any) {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      return { message: "Unauthorized" };
    }
  }
}
