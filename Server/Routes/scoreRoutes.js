const express = require("express");
const router = express.Router();
const {
  submitScore,
  getTeamScores,
  getLeaderboard,
} = require("../controllers/scoreController");

const { authMiddleware } = require("../middleware/authMiddleware");


// ✅ Evaluator submits score
router.post("/team/:teamId", authMiddleware, submitScore);
console.log("✅ Score route loaded");


// ✅ Get all scores for a specific team + average
router.get("/team/:teamId", getTeamScores);

// ✅ Leaderboard (final result view)
router.get("/leaderboard", getLeaderboard);

module.exports = router;
