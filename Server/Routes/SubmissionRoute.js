const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const { uploadSubmission, getTeamSubmissions, getLatestSubmissions } = require("../controllers/SubmissionController");

// Upload a submission (team/teamMember)
router.post("/submit/:id", authMiddleware, uploadSubmission);


// Get submissions of a team
router.get("/my-submissions/:teamId", getTeamSubmissions);

// Get latest submissions (admin)
router.get("/latest", getLatestSubmissions);

module.exports = router;
