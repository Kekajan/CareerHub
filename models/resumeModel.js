import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    education: [{
        degree: {
            type: String,
            required: true,
            trim: true,
        },
        institution: {
            type: String,
            required: true,
            trim: true,
        },
        year: {
            type: Number,
            required: true,
            validate: {
                validator: (value) => value > 1900 && value <= new Date().getFullYear(),
                message: "Year must be a valid number between 1900 and the current year",
            },
        }
    }],
    experience: [
        {
            jobTitle: {
                type: String,
                required: true,
                trim: true,
            },
            company: {
                type: String,
                required: true,
                trim: true,
            },
            duration: {
                type: String,
                required: true,
                trim: true,
            }
        }
    ]
}, {timestamps: true})

const Resume = mongoose.model('Resume', resumeSchema)
export default Resume;