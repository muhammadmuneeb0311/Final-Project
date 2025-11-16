const Score = require("../Models/EvaluationScore");
const Team = require("../Models/Team");
const Submission = require("../Models/Submission");

submitScore = async (req, res) => {
  try {
    const { teamId } = req.params;
    const evaluatorId = req.user.id; // ✅ from token (evaluator login)
    const scores = req.body.scores;
    // validate incoming scores object generically (expect numbers)
    if (!scores || typeof scores !== "object") {
      return res.status(400).json({ message: "Scores are required and must be an object" });
    }

    // Ensure evaluator id is present
    if (!evaluatorId) {
      return res.status(401).json({ message: "Unauthorized: evaluator id missing from token" });
    }

    // Ensure team exists
    const teamExists = await Team.findById(teamId);
    if (!teamExists) {
      return res.status(404).json({ message: "Team not found" });
    }

    Object.keys(scores).forEach((key) => {
      const val = scores[key];
      if (typeof val !== "number" || isNaN(val) || val < 0 || val > 10) {
        // default max allowed is 10 (criteria.max_marks typically set by admin)
        throw new Error(`${key} must be a number between 0 and 10`);
      }
    });

    // ✅ calculate total as generic sum of provided scores
    const totalScore = Object.values(scores).reduce((sum, v) => sum + (Number(v) || 0), 0);

    // ✅ check if evaluator already submitted score for this team
    const existing = await Score.findOne({ teamId, evaluatorId });
    if (existing) {
      return res.status(400).json({ message: "Score already submitted for this team" });
    }

    // ✅ save score
    const newScore = new Score({
      teamId,
      evaluatorId,
      scores,
      totalScore,
    });

    console.log(`Attempting to save score for team=${teamId} evaluator=${evaluatorId} total=${totalScore}`);
    try {
      await newScore.save();
      console.log('Score saved successfully:', newScore._id);
    } catch (saveErr) {
      console.error('Error saving score:', saveErr);
      // duplicate key error (unique index teamId+evaluatorId)
      if (saveErr.code === 11000) {
        return res.status(409).json({ message: 'Score already exists for this evaluator and team' });
      }
      if (saveErr.name === 'ValidationError') {
        return res.status(400).json({ message: 'Invalid score data', error: saveErr.message });
      }
      return res.status(500).json({ message: 'Error saving score', error: saveErr.message });
    }

    console.log('Updating submission status to submitted for team:', teamId);

    // ✅ Update submission status to "submitted"
    await Submission.findOneAndUpdate(
      { teamId },
      { status: "submitted" },
      { new: true }
    );

    // 🧮 Optional: If all evaluators have submitted their score
    const team = await Team.findById(teamId).populate("evaluators");
    const submittedScores = await Score.countDocuments({ teamId });

    if (team && Array.isArray(team.evaluators)) {
      const totalEvaluators = team.evaluators.length;
      if (totalEvaluators > 0 && submittedScores >= totalEvaluators) {
        // ✅ All evaluators scored → mark as fully evaluated
        await Submission.findOneAndUpdate(
          { teamId },
          { status: "evaluated" },
          { new: true }
        );
      }
    } else {
      // If team or evaluators are missing, log and skip the final evaluated check
      console.warn(`Team or evaluators missing for teamId=${teamId}; submittedScores=${submittedScores}`);
    }

    res.json({ message: "Score submitted successfully ✅", newScore });
  } catch (err) {
    console.error("❌ Score Submit Error:", err);
    res.status(500).json({ message: "Error submitting score ❌", error: err.message });
  }
};

// 📊 Get team scores & average
getTeamScores = async (req, res) => {
  try {
    const { teamId } = req.params;
    const scores = await Score.find({ teamId }).populate("evaluatorId", "name");

    // ✅ calculate average
    const total = scores.reduce((sum, s) => sum + s.totalScore, 0);
    const average = scores.length > 0 ? total / scores.length : 0;

    res.json({ teamId, averageScore: average, evaluatorScores: scores });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching team scores ❌" });
  }
};

// 🏆 Leaderboard
getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Score.aggregate([
      {
        $group: {
          _id: "$teamId",
          averageScore: { $avg: "$totalScore" },
          totalEvaluators: { $sum: 1 },
        },
      },
      { $sort: { averageScore: -1 } },
    ]);

    const results = await Promise.all(
      leaderboard.map(async (item) => {
        const team = await Team.findById(item._id);
        return {
          teamId: item._id,
          teamName: team.teamName,
          averageScore: item.averageScore,
          totalEvaluators: item.totalEvaluators,
        };
      })
    );

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching leaderboard ❌" });
  }
};

module.exports = { submitScore, getTeamScores, getLeaderboard };