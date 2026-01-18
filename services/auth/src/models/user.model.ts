import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    email: string,
    passwordHash: string,
    role: 'admin' | 'user',
    createdAt: Date
}

const UserSchem = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
},
    {
        timestamps: { createdAt: true, updatedAt: false },
    })

export const UserModel = mongoose.model<IUser>("User", UserSchem);