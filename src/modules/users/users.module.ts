import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  modules: [DatabaseModule],
  controllers: [UsersController],
  components: [
    UsersService,
    ...usersProviders,
  ],
})
export class UsersModule {}