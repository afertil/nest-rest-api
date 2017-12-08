import * as mongoose from 'mongoose';

import { APP_CONFIG } from './../../config';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<mongoose.Connection> => {
      (mongoose as any).Promise = global.Promise;
      return await mongoose.connect(APP_CONFIG.databaseURL, {
        useMongoClient: true,
      });
    },
  },
];
