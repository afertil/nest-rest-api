import { Component, Inject, forwardRef } from '@nestjs/common';
import { Model } from 'mongoose';
import { HttpException } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';

import { UsersService } from './../users/users.service';

@Component()
export class AuthService {

  constructor(
    private readonly usersService: UsersService
  ) {}

  async createToken() {
    const expiresIn = 60 * 60, secretOrKey = 'secret';
    const user = { email: 'thisis@example.com' };
    const token = jwt.sign(user, secretOrKey, { expiresIn });
    console.log(token);
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async validateUser(signedUser): Promise<Boolean> {
    // const user = await this.UserModel.findOne(options).exec();
    return true;
  }

  async sign(credentials: { email: string, password: string }): Promise<string> {
    
    const user = await this.usersService.findOne(credentials);

    // Throw error if no user

    const payload = {
      id: user._id,
      email: user.email,
    };

    return await jwt.sign(payload, 'value', {});
    
  }
}
