const express = require("express");
const router = express.Router();
const Submission = require("../Models/Submission");

// GET submissions for a specific team
router.get("/my-submissions/:teamId", async (req, res) => {
  const { teamId } = req.params;

  try {
    const submissions = await Submission.find({ team: teamId })
      .populate("user", "name email")  // Populate uploader's info
      .sort({ createdAt: -1 });       // Optional: latest first

    res.json({
      teamId,
      totalVideos: submissions.length,
      submissions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error fetching team submissions" });
  }
});

module.exports = router;
