import { Module, RequestMethod, MiddlewaresConsumer } from '@nestjs/common';

import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { articlesProviders } from './articles.providers';
import { DatabaseModule } from '../database/database.module';
import { AuthMiddleware } from '../common/middlewares/auth.middlewares';

@Module({
  modules: [DatabaseModule],
  controllers: [ArticlesController],
  components: [
    ArticlesService,
    ...articlesProviders,
  ],
  exports: [
    ArticlesService
  ],
})
export class ArticlesModule {
  
}