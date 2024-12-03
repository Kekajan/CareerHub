import Application from "../models/applicationModel";
import Job from "../models/jobModel";
import Resume from "../models/resumeModel";

const applyForJob = async (req, res) => {
  try {
    const { jobId, userId, resumeId, resumeDetails } = req.body;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    let resume;
    if (resumeId) {
      resume = await Resume.findOne({ _id: resumeId, userId });
      if (!resume) {
        return res
          .status(404)
          .json({ message: "Resume not found or not authorized" });
      }
    } else if (resumeDetails) {
      resume = new Resume({ userId, ...resumeDetails });
      await resume.save();
    } else {
      return res.status(400).json({
        message: "Either resumeId or resumeDetails must be provided.",
      });
    }

    const existingApplication = await Application.findOne({ jobId, userId });
    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job" });
    }

    const application = new Application({
      jobId,
      userId,
      resumeId: resume._id,
      status: "pending",
    });
    const savedApplication = await application.save();
    res.status(201).json({
      message: "Application submitted successfully",
      data: savedApplication,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getApplicationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const applications = await Application.find({ userId })
      .populate("jobId", "title description location")
      .populate("resumeId");
    res.status(200).json({ data: applications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await Application.find({ jobId })
      .populate("userId", "firstName, lastName email")
      .populate("resumeId");
    res.status(200).json({ data: applications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true, runValidators: true }
    );
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res
      .status(200)
      .json({ message: "Application status updated", data: application });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const application = await Application.findByIdAndDelete(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getApplicationDetails = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const application = await Application.findById(applicationId)
      .populate("jobId", "title description location")
      .populate("userId", "firstName lastName email")
      .populate("resumeId");
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({ data: application });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  applyForJob,
  getApplicationsByUser,
  getApplicationsByJob,
  updateApplicationStatus,
  deleteApplication,
  getApplicationDetails,
};
