import { Connection } from 'mongoose';
import { UserSchema } from './schemas/user.schema';

export const usersProviders = [
  {
    provide: 'UserModelToken', // Deplace to a constants.ts
    useFactory: (connection: Connection) => connection.model('users', UserSchema),
    inject: ['DbConnectionToken'], // Deplace to a constants.ts
  },
];