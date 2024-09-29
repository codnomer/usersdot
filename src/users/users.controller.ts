import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('search') search: string = '',
  ) {
    return this.usersService.getUsers(page, pageSize, search);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.usersService.getUserById(+id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @Post('save')
  async saveUser(@Body() userData: any) {
    return this.usersService.saveUser(userData);
  }

  @Post('update')
  async updateUser(@Body() userData: any) {
    return this.usersService.updateUser(userData);
  }
}
