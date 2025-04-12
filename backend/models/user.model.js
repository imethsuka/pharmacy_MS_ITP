import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: false,
            enum: ["male", "female", "other"],
        },
        dob: {
            type: Date,
            required: false,
        },
        address: {
            type: String,
            required: false,
        },
        profilePicture: {
            type: String,
            default: null,
        },
        lastLogin: {
            type: Date,
            default: Date.now,
        },
        resetPasswordToken: String,
        resetPasswordExpiresAt: Date,
    },
    { timestamps: true }
);

const User = mongoose.model("users", userSchema);

export default User;