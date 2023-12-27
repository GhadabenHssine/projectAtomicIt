// models/userSchema.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    location:string;
    phone:string;

    superAdmin: boolean;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
    username: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: String, required: true },
    superAdmin: { type: Boolean, default: false },
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
