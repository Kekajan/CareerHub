import express from "express";
import jobRoutes from '../routes/jobRoutes.js';
import userRoutes from '../routes/userRoutes.js';
import applicationRoutes from '../routes/applicationRoutes.js'

const router = express.Router();

router.use("/api/users", userRoutes);
router.use("/api/jobs", jobRoutes);
router.use("/api/applications", applicationRoutes);

export default router;