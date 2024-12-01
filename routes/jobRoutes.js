import express from "express";
import {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
  } from "../controllers/jobController.js";

const router = express.Router();
router.post('/createJob', createJob)
router.get('/getJobs', getJobs)
router.get('/getJob/:id', getJobById)
router.put('/updateJob/:id', updateJob)
router.delete('/deleteJob/:id', deleteJob)

export default router;