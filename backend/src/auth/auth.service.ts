import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserDto } from '../user/dto/user.dto';
import { UsersService } from '../user/user.service';
import { JwtToken } from './types/Jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from "argon2";

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto): Promise<UserDto> {
    return this.usersService.register(userDto);
  }

  async login(email: string, password: string): Promise<JwtToken> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await this.usersService.validatePassword(
      password,
      user.password,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');
    const tokens = await this.getTokens(user._id, user.email, user.role);
    await this.updateRefreshToken(user._id, tokens.refreshToken);
    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken
    };
  }

  async logout(uid: string) {
    return this.usersService.updateUser(uid, {refreshToken: null});
  }

  async updateRefreshToken(uid: string, refreshToken: string) {
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.usersService.updateUser(uid, { 
      $set: {
        "refreshToken": hashedRefreshToken,
      }
    });
  }

  async getTokens(uid: string, email: string, role: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          uid: uid,
          email: email,
          role: role
        },
        {
          secret: this.configService.get<string>("JWT_SECRET"),
          expiresIn: "15m"
        }
      ),
      this.jwtService.signAsync(
        {
          uid: uid,
          email: email,
          role: role
        },
        {
          secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
          expiresIn: "1d"
        }
      )
    ]);

    return { accessToken, refreshToken };
  }

  async refreshTokens(uid: string, plainRefreshToken: string): Promise<JwtToken> {
    const user = await this.usersService.findById(uid);

    if(!user || !user.refreshToken)
      throw new ForbiddenException("Access Denied");
   
    const refreshTokenMatches = await argon2.verify(user.refreshToken, plainRefreshToken);
 
    if(!refreshTokenMatches)
      throw new ForbiddenException("Access Denied");

    const tokens = await this.getTokens(user._id, user.email, user.role);
    await this.updateRefreshToken(user._id, tokens.refreshToken);

    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken
    };
  }
}
