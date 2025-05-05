import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { userIdDTO } from './dto/userId-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  getUsers() {
    return this.service.listAll();
  }

  @Get(':id')
  getUser(@Param() params: userIdDTO) {
    const { id } = params;
    return this.service.getUser(id);
  }

  @Post()
  postUser(@Body() dto: CreateUserDto) {
    return this.service.create(dto.name);
  }

  @Delete(':id')
  deleteUser(@Param() params: userIdDTO) {
    const { id } = params;
    this.service.remove(id);
  }
}
