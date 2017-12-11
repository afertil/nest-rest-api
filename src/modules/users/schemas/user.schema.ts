import { Schema } from 'mongoose';

export const schema = new Schema({
  name: String,
  age: Number,
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  admin: Boolean,
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

/**
 * On every save, add the date
 */
schema.pre('save', function(next) {
  const currentDate = new Date();

  this.updated_at = currentDate;
  next();
});

export const UserSchema = schema;
