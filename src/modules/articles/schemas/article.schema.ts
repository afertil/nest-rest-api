import { Schema } from 'mongoose';

import { User } from '../../users/interfaces/user.interface';

const article = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  photo: { data: Buffer, contentType: String },
  author: { type: String, required: true },
  // author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  comments: { type: [String] },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});


/**
 * On every save, add the date
 */
article.pre('save', function(next) {
  const currentDate = new Date();

  this.updated_at = currentDate;
  next();
});


export const ArticleSchema = article;
