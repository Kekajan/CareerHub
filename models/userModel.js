import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
        type: String,
        required: true,        
    },
    role: {
        type: String,
        enum: ['employer', 'job-seeker'],
        required: true,
    }}, { timestamps: true })

const User = mongoose.model('User', userSchema);
export default User;