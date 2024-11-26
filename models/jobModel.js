import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    industry: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
        min: 0,
    },
    skills: {
        type: [String],
        required: true,
    },
    employerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,        
    }
}, {timestamps: true})

const Job = mongoose.model('Job', jobSchema)
export default Job