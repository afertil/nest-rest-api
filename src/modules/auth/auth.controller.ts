import { Controller, Post, HttpStatus, HttpCode, Get, Response, Body } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('/login')
  public async login(
    @Response() res, 
    @Body('email') email, 
    @Body('password') password)
  {
      const auth = await this.authService.login(email, password);
      res.status(HttpStatus.OK).json(auth);
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
