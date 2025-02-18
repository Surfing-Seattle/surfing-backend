import mongoose, { Schema, Document, Model } from 'mongoose';
import { User } from '../types/user.types';

interface UserMethods {
  updateLastLogin(): Promise<UserDocument>;
}

export interface UserDocument extends User, Document, UserMethods {}

interface UserModel extends Model<UserDocument> {}

const userSchema = new Schema<UserDocument, UserModel>(
  {
    walletAddress: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    lastLogin: {
      type: Date,
      default: Date.now
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.methods.updateLastLogin = function(): Promise<UserDocument> {
  this.lastLogin = new Date();
  return this.save();
};

export const UserModel = mongoose.model<UserDocument, UserModel>('User', userSchema);
