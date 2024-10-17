import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtToken } from './types/Jwt';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: CreateUserDto): Promise<UserDto> {
    return this.authService.register(userDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<JwtToken> {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refreshTokens(@Request() req) {
    const uid = req.user["uid"];
    const refreshToken = req.user["refreshToken"];
    return this.authService.refreshTokens(uid, refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logout(@Request() req) {
    this.authService.logout(req.user["_id"]);
  }
}
