const Submission = require("../Models/Submission");

// Create a submission
const createSubmission = async (req, res) => {
  try {
    const submission = new Submission({
      team: req.user.id,
      fileUrl: req.body.fileUrl,
    });
    await submission.save();
    res.json(submission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get my submissions
const getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ team: req.user.id });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get latest submission
const getLatestSubmission = async (req, res) => {
  try {
    const latest = await Submission.findOne().sort({ createdAt: -1 });
    res.json(latest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createSubmission, getMySubmissions, getLatestSubmission };
