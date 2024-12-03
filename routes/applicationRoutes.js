import express from "express";
import { applyForJob,
    getApplicationsByUser,
    getApplicationsByJob,
    updateApplicationStatus,
    deleteApplication,
    getApplicationDetails } from "../controllers/applicationController.js";

const router = express.Router();

router.post('/applyJob', applyForJob)
router.get('/getApplication/:userId', getApplicationsByUser)
router.get('/getApplication/:jobId', getApplicationsByJob)
router.put('/updateStatus/:applicationId', updateApplicationStatus)
router.delete('/deleteApplication/:applicationId', deleteApplication)
router.get('/getDetails/:applicationId', getApplicationDetails)

export default router;