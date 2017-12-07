import { Component } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';

@Component()
export class AuthService {
  async createToken() {
    const expiresIn = 60 * 60, secretOrKey = 'secret';
    const user = { email: 'thisis@example.com' };
    const token = jwt.sign(user, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async validateUser(signedUser): Promise<boolean> {
    // put some validation logic here
    // for example query user by id / email / username
    return true;
  }

  login(email, password) {
    
    if (!email)
      return(new HttpException("Email is required", 422));

    if (!password)
      return(new HttpException("Password is required", 422));

    if (this.validateUser) {
      return 'token'; // Token return generated token
    } else {
      return(new HttpException("Wrong user/password combinaison", 422));
    }
    
    
  }
}
