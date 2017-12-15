import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';

@Module({
  modules: [
    AuthModule,
    UsersModule,
    ArticlesModule
  ]
})
export class ApplicationModule {}
