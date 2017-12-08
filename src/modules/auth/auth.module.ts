import { Module } from '@nestjs/common';
import * as passport from 'passport';

// Modules
import { UsersModule } from './../users/users.module';

// Components
import { AuthService } from './auth.service';
import { JwtStrategy } from './passport/jwt.strategy';

// Controllers
import { AuthController } from './auth.controller';

@Module({
  modules: [UsersModule],
  components: [
    AuthService,
    JwtStrategy
  ],
  controllers: [AuthController],
})
export class AuthModule {}
