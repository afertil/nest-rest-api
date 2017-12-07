import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<mongoose.Connection> => {
      (mongoose as any).Promise = global.Promise;
      return await mongoose.connect('mongodb://admin:admin@nest-rest-api-shard-00-00-2rnby.mongodb.net:27017,nest-rest-api-shard-00-01-2rnby.mongodb.net:27017,nest-rest-api-shard-00-02-2rnby.mongodb.net:27017/database?ssl=true&replicaSet=nest-rest-api-shard-0&authSource=admin', {
        useMongoClient: true,
      });
    },
  },
];
