import { Component, HttpStatus, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as os from 'os';

import { APP_CONFIG } from '../../../config';
import { User } from '../../users/interfaces/user.interface';
import { UsersService } from './../../users/users.service';

@Component()
export class JwtService {

  constructor(
    private readonly usersService: UsersService
  ) {}

  /**
   * Generates a new JWT token
   * 
   * @param {User} user - The user to create the payload for the JWT
   * @returns {Promise} tokens - The access and the refresh token
   */
  async generateToken(user: User): Promise<any> {

    const payload = {
      sub: {
        id: user.id,
        email: user.email,
        username: user.username
      },
      iss: os.hostname()
    };
    const accessToken = await jwt.sign(payload, APP_CONFIG.jwtSecret, {
      expiresIn: APP_CONFIG.accessTokenExpires
    });
    const refreshToken = await jwt.sign(payload, APP_CONFIG.jwtSecret, {
      expiresIn: APP_CONFIG.refreshTokenExpires
    });

    return { accessToken, refreshToken };
  }
  
  /**
   * Validates the token
   * 
   * @param {string} token - The JWT token to validate
   */
  async verify(token: string): Promise<User | null> {

    try {
      const payload = jwt.verify(token, APP_CONFIG.jwtSecret);
      const user = await this.usersService.findById(payload.sub.id);

      if (!user) throw new HttpException('Unauthorized access', HttpStatus.BAD_REQUEST);
      
      return user;
    } catch(err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

}
