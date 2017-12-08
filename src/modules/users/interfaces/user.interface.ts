import { Document } from 'mongoose';

export interface User extends Document {
  readonly name: string;
  readonly age: number;
  readonly email: string;
  readonly password: string;
}
