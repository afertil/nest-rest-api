import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Component()
export class UsersService {
  constructor(
    @Inject('UserModelToken') private readonly UserModel: Model<User>
  ) {}

  async create(user: User): Promise<User> {
    const createdUser = new this.UserModel(user);
    return await createdUser.save();
  }

  async findAll(options?: any): Promise<User[]> {
    return await this.UserModel.find(options).exec();
  }

  async findById(id: string): Promise<User | null> {
    return await this.UserModel.findById(id).exec();
  }

  async findOne(options?: any, fields?: any): Promise<User | null> {
    return await this.UserModel.findOne(options, fields).exec();
  }

  async update(id: number, newValue: User): Promise<User | null> {
    console.log(id);
    return await this.UserModel.findByIdAndUpdate(id, newValue).exec();
  }

  async delete(id: number): Promise<User | null> {
    return await this.UserModel.findByIdAndRemove(id).exec();
  }
}