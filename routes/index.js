import express from "express";
import jobRoutes from '../routes/jobRoutes.js';

const router = express.Router();

router.use("/api/job", jobRoutes);

export default router;