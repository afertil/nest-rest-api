import { Module } from '@nestjs/common';
import * as passport from 'passport';

// Modules
import { UsersModule } from './../users/users.module';

// Components
import { AuthService } from './auth.service';
import { JwtService } from './jwt/jwt.service';

// Controllers
import { AuthController } from './auth.controller';

@Module({
  modules: [UsersModule],
  components: [
    AuthService,
    JwtService
  ],
  controllers: [AuthController],
})
export class AuthModule {}
