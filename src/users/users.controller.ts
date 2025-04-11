import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { LoginDto } from './dto/login.dto';
import { UserLoggedDto } from './dto/user-logged.dto';
import { QueryFailedError } from 'typeorm';
import { rethrow } from '@nestjs/core/helpers/rethrow';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(@Body() dto: CreateUserDto) {
    try {
      return await this.usersService.create(dto);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const { code } = error.driverError;
        switch (code) {
          case '23505':
            throw new HttpException(
              'Email already exists',
              HttpStatus.CONFLICT,
            );
          default:
            console.log('Unhandled error code', error.driverError.code);
        }
      }
      rethrow(error);
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto): Promise<UserLoggedDto> {
    return this.usersService.login(dto);
  }

  @Get('profile')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }
}
