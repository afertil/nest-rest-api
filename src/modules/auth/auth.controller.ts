import { Controller, Post, HttpStatus, HttpCode, Get, Request, Response, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UsersService } from './../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('/login')
  public async login(@Request() req, @Response() res) {
    const body = req.body;

    // Throw error if body is missing
    const token = await this.authService.sign(body);
    res.status(HttpStatus.OK).json('Bearer ' + token);
  }

  @Post('token')
  @HttpCode(HttpStatus.OK)
  public async getToken() {
    return await this.authService.createToken();
  }

  @Get('authorized')
  public async authorized() {
    console.log('Authorized route...');
  }
}
