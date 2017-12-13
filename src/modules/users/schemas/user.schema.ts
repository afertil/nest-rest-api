import { Schema } from 'mongoose';

let user = new Schema({
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
user.pre('save', function(next) {
  const currentDate = new Date();

  this.updated_at = currentDate;
  next();
});

user.methods.toAuthJSON = function() {
  return {
    username: this.username,
    email: this.email
  }
};

export const UserSchema = user;
