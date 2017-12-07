import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  modules: [
    AuthModule,
    UsersModule
  ]
})
export class ApplicationModule {}
