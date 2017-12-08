import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Component()
export class UsersService {
  constructor(
    @Inject('UserModelToken') private readonly UserModel: Model<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.UserModel(createUserDto);
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.UserModel.find().exec();
  }

  async findById(id: string): Promise<User | null> {
    return await this.UserModel.findById(id).exec();
  }

  async findOne(options: Object): Promise<User | null> {
    return await this.UserModel.findOne(options).exec();
  }
}