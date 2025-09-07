const express = require("express");
const router = express.Router();
const Submission = require("../Models/Submission");

// POST: Upload submission
router.post("/submit", async (req, res) => {
  try {
    const { title, videoUrl, description, learningOutcome, userId, teamId } = req.body;

    if (!title || !videoUrl || !description || !learningOutcome || !userId || !teamId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const submission = new Submission({
      title,
      videoUrl,
      description,
      learningOutcome,
      user: userId,
      team: teamId,
    });

    await submission.save();
    res.status(201).json({ message: "Submission uploaded successfully", submission });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while uploading submission" });
  }
});

// GET: Fetch submissions for a team
router.get("/my-submissions/:teamId", async (req, res) => {
  try {
    const { teamId } = req.params;
    const submissions = await Submission.find({ team: teamId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({ teamId, totalVideos: submissions.length, submissions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching submissions" });
  }
});
 
// GET: Fetch latest submissions (for dashboard/admin)
router.get("/latest", async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate("team", "name") // include team name
      .populate("user", "name email") // include user details
      .sort({ createdAt: -1 })
      .limit(10);

    const formatted = submissions.map((s) => ({
      _id: s._id,
      title: s.title,
      videoUrl: s.videoUrl,
      teamName: s.team?.name || "Unknown Team",
      userName: s.user?.name || "Unknown User",
      userEmail: s.user?.email || "",
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching latest submissions" });
  }
});

module.exports = router;
