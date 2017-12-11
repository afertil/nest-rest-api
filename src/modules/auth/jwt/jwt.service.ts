import { Component } from '@nestjs/common';
import { Model } from 'mongoose';
import { HttpException } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';

import { APP_CONFIG } from '../../../config';
import { User } from '../../users/interfaces/user.interface';

@Component()
export class JwtService {

  constructor() {}

  /**
   * Generates a new JWT token
   * 
   * @param {User} user - the user to create the payload for the JWT
   * @returns {Promise} tokens - The access and the refresh token
   */
  async createToken(user: User): Promise<any> {

    const payload = {
      id: user._id,
      email: user.email,
    };
    const accessToken = `Bearer ${await jwt.sign(payload, APP_CONFIG.jwtSecret, {
      expiresIn: APP_CONFIG.accessTokenExpires
    })}`;
    const refreshToken = `Bearer ${await jwt.sign(payload, APP_CONFIG.jwtSecret, {
      expiresIn: APP_CONFIG.refreshTokenExpires
    })}`;

    return { accessToken, refreshToken };
  }

}
