import { Middleware, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import * as jwt from 'jsonwebtoken';
import { APP_CONFIG } from '../../../config';

@Middleware()
export class AuthMiddleware implements NestMiddleware {

  resolve() {
    return async (req: Request, res: Response, next: NextFunction) => {

      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        let token = req.headers.authorization.split(' ')[1];

        jwt.verify(token, APP_CONFIG.jwtSecret, (err, payload) => {      
          
          if(!err) {
            
            //confirm identity and check user permissions
            req.payload = payload; 
            next();
          } else {
            return res.status(403).json(err);
          }
        });
      } else {
        return res.status(401).json("You must provide a valid authenticated access token.");
      }
    }
  }     
}
