import { Document } from 'mongoose';

import { User } from '../../users/interfaces/user.interface';

export interface Article extends Document {
  title?: String,
  content?: String,
  photo?: Buffer,
  author?: User,
  comments?: [String],
  created_at: Date,
  updated_at: Date
}
