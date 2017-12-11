import { Middleware, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import * as jwt from 'jsonwebtoken';
import { APP_CONFIG } from '../../../config';
import { UsersService } from './../../users/users.service';

@Middleware()
export class AuthMiddleware implements NestMiddleware {

  constructor(
    private readonly usersService: UsersService
  ) {}

  resolve() {
    return async (req: Request, res: Response, next: NextFunction) => {

      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const token = req.headers.authorization.split(' ')[1];

        jwt.verify(token, APP_CONFIG.jwtSecret, (err, payload) => {      
          
          if(!err) {
            const user = this.usersService.findById(payload.id);

            if (!user) throw new HttpException('Unauthorized access', HttpStatus.BAD_REQUEST);

            // Verify user exists on databse
            req.payload = payload; 
            next();
          } else {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
          }
        });
      } else {
        throw new HttpException('Unauthorized access', HttpStatus.BAD_REQUEST);
      }
    }
  }     
}
