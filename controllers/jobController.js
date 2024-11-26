import Job from "../models/jobModel.js";

const createJob = async (req, res) => {
    try {
        const { title, description, location, industry, salary, skills, employerId } = req.body;
        const job = new Job({ title,
            description,
            location,
            industry,
            salary,
            skills,
            employerId})
        const savedJob = await job.save();
        res.status(201).json({ message: "Job created successfully", data: savedJob})
    } catch (error) {
        res.status(500).json({error: error.message})       
    }
}

const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate("employerId").sort({createdAt: -1})
        res.status(200).json({data: jobs})      
    } catch (error) {
        res.status(500).json({error: error.message})        
    }
}

const getJobById = async (req, res) => {
    try {
        const {id} = req.params;
        const job = await Job.findById(id).populate("employerId")
        if(!job) {
            res.status(404).json({message: "Job not found"})
        }
        res.status(200).json({data: job})
    } catch (error) {
        res.status(500).json({error: error.message})        
    }
}

const updateJob = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedJob = await Job.findByIdAndUpdate(id, req.body, {new: true, runValidators: true})
        if(!updatedJob) {
            res.status(404).json({message: "Job not found"})
        }
        res.status(200).json({ message: "Job updated successfully", data: updatedJob})       
    } catch (error) {
        res.status(500).json({error: error.message})       
    }
}

const deleteJob = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedJob = await Job.findByIdAndDelete(id)
        if(!deletedJob) {
            res.status(404).json({message: "Job not found"})
        }
        res.status(200).json({ message: "Job deleted successfully" })    
    } catch (error) {
        res.status(500).json({error: error.message})       
    }
}

export {createJob, getJobs, getJobById, updateJob, deleteJob};