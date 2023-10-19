import { UserAttributes } from "@/interfaces";
import mongoose, { CallbackError, Document, Model } from "mongoose";
import bcrypt from 'bcrypt';

export interface UserDocument extends UserAttributes, Document {}

const UserSchema = new mongoose.Schema<UserDocument>({
    fullname: {
        type: String,
        required: [true, "Please enter your fullname"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [6, "Your password must be longer than 6 characters"],
        select: false,
    },
    avatar: {
        public_id: String,
        url: String
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Pre-save middleware to hash the password before saving the user
UserSchema.pre('save', async function (next) {
    const user = this as UserDocument;
    if (!user.isModified('password')) return next();

    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
        next();
    } catch (error) {
        return next(error as CallbackError);
    }
});

const UserModel: Model<UserDocument> = mongoose.models.User || mongoose.model('User', UserSchema);

export default UserModel;