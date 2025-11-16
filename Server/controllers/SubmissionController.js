const Submission = require("../Models/Submission");
const TeamMember = require("../Models/TeamMember");
const Team = require("../Models/Team");
const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");

// Upload Submission (TeamMember -> teamId)

const uploadSubmission = async (req, res) => {
  try {
    const { topic, videoLink, description, learningOutcomes } = req.body;
    const { id } = req.params;

    if (!topic || !videoLink || !description || !learningOutcomes) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let teamId;

    // find team or team member
    const team = await Team.findById(id);
    if (team) {
      teamId = team._id;
    } else {
      const member = await TeamMember.findById(id);
      if (!member) {
        return res.status(404).json({ message: "Team or Team Member not found" });
      }
      teamId = member.teamId;
    }

    // ✅ directly save (skip video file check)
    const submission = new Submission({
      topic,
      videoLink, // external URL
      description,
      learningOutcomes,
      teamId,
       status: "submitted",
    });

    await submission.save();
    res.status(201).json({ message: "Submission uploaded successfully", submission });
  } catch (err) {
    console.error("Submission Error:", err);
    res.status(500).json({ message: "Server error while uploading submission" });
  }
};




// ✅ Get all submissions for a team
const getTeamSubmissions = async (req, res) => {
  try {
    const { teamId } = req.params;
    const submissions = await Submission.find({ teamId });
    res.json({ submissions, totalVideos: submissions.length });
  } catch (err) {
    console.error("Error fetching team submissions:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Latest submissions (for admin)
const getLatestSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
      .sort({ createdAt: -1 })
      .populate("teamId", "teamName"); // uploader is team
    res.json(submissions);
  } catch (err) {
    console.error("Fetch Latest Submissions Error:", err);
    res.status(500).json({ message: "Server error while fetching submissions" });
  }
};

module.exports = {
  uploadSubmission,
  getTeamSubmissions,
  getLatestSubmissions,
};
