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
    let users = await this.UserModel.find(options).exec();
    const serializedUsers = users.map((user) => {
      return user.schema.methods.serialize(user);
    });

    return serializedUsers;
  }

  async findById(id: string): Promise<User | null> {
    let user = await this.UserModel.findById(id).exec();

    if (user) {
      user = user.schema.methods.serialize(user);
    }

    return user;
  }

  async findOne(options: any, fields?: any, isSerialized?: boolean): Promise<User | null> {
    let user = await this.UserModel.findOne(options, fields).exec();

    if (user && isSerialized) {
      user = user.schema.methods.serialize(user);
    }

    return user;
  }

  async update(id: number, newValue: User): Promise<User | null> {
    return await this.UserModel.findByIdAndUpdate(id, newValue).exec();
  }

  async delete(id: number): Promise<User | null> {
    return await this.UserModel.findByIdAndRemove(id).exec();
  }
}