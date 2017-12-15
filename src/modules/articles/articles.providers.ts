import { Connection } from 'mongoose';
import { ArticleSchema } from './schemas/article.schema';

export const articlesProviders = [
  {
    provide: 'ArticleModelToken',
    useFactory: (connection: Connection) => connection.model('Article', ArticleSchema),
    inject: ['DbConnectionToken']
  },
];