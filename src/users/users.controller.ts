import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get('profile')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }
}
