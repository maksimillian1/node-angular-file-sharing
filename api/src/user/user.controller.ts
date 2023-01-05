import {
  Body,
  Controller,
  Get,
  HttpException,
  Inject,
  Post,
  UseGuards,
  Request,
  UseInterceptors, UploadedFile, Param
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { REQUEST } from '@nestjs/core';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UserController {

  constructor(
    private readonly userService: UserService,
    @Inject(REQUEST) private readonly request: Request
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  public async getAll(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  public async getMe(): Promise<User> {
    const user = (this.request as Request & {user: User}).user;

    return this.userService.getUserByEmail(user.email);
  }

  @Post('register')
  public async createUser(@Body() user: any): Promise<User> {
    if(!user.password) {
      throw new HttpException('Missing password', 422);
    }
    return this.userService.create(user);
  }

  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('upload'))
  upload(@Param('id') id: string, @UploadedFile() file: any) {
    if(!file) {
      return;
    }

    return this.userService.creatUserMedia(id, file);
  }
}
