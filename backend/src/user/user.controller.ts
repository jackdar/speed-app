import { Controller, Get, Put, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateDto: any) {
    return this.usersService.updateUser(id, updateDto);
  }
}
