import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "default",
        required: true,
    },
    appliedDate: {
        type: Date,
        default: Date.now,
        required: true,
    }
}, {timestamps: true})

const Application = mongoose.model('Application', applicationSchema)
export default Application