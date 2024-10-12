import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { UsersService } from '../user/user.service';
import { JwtToken } from './types/Jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

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

    const payload = { uid: user._id, email: user.email, role: user.role };
    const tokens = await this.getTokens(user._id, user.email, user.role);
    await this.updateRefreshToken(user._id, tokens.refreshToken);
    // console.log(tokens);
    return {
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken
    };
    // return {
    //   access_token: this.jwtService.sign(payload),
    // };
  }

  async logout(uid: string) {
    return this.usersService.updateUser(uid, {refreshToken: null});
  }

  async updateRefreshToken(uid: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersService.updateUser(uid, {
      refreshToken: hashedRefreshToken,
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
          expiresIn: "30m"
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
          expiresIn: "7d"
        }
      )
    ]);

    return { accessToken, refreshToken };
  }

  async refreshTokens(uid: string, refreshToken: string): Promise<JwtToken> {
    const user = await this.usersService.findById(uid);

    if(!user || !user.refreshToken)
      throw new ForbiddenException("Access Denied");
  
    const refreshTokenMatches = await bcrypt.compare(refreshToken, user.refreshToken);

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
