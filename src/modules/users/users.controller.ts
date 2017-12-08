import { Controller, Get, Post, Body, UseGuards, Param, Request } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
  }

  @Get()
  async index(): Promise<User[]> {
    return this.usersService.findAll();
  }
  
  @Get(':id')
  async show(@Request() req): Promise<User> {
    const id = req.params.id;

    // Throw error if no id

    return this.usersService.findById(id);
  }
}
