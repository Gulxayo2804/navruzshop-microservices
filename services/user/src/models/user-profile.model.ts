import mongoose, { Schema, Document } from "mongoose";

export interface IUserProfile extends Document {
  userId: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
}

const UserProfileSchema = new Schema<IUserProfile>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: String,
    lastName: String,
    phone: String,
    address: String,
  },
  { timestamps: true }
);

export const UserProfileModel = mongoose.model<IUserProfile>(
  "UserProfile",
  UserProfileSchema
);
