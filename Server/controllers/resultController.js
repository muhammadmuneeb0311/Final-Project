const Team = require("../Models/Team");
const Result = require("../Models/Result");
const Score = require("../Models/EvaluationScore");

// ===== Helper: Calculate weighted score =====
const computeScore = (scores) => {
  if (!scores) return 0;

  if (typeof scores.get === "function") {
    scores = Object.fromEntries(scores.entries());
  }
  if (scores.toObject) scores = scores.toObject();
  if (scores.totalScore) return Number(scores.totalScore);

  const get = (key) => Number(scores[key] || 0);

  return (
    get("relevance_to_los") * 0.05 +
    get("innovation_&_creativity") * 0.15 +
    get("clarity_and_accessibility") * 0.10 +
    get("depth") * 0.05 +
    get("interactivity_and_engagement") * 0.25 +
    get("use_of_technology") * 0.05 +
    (get("scalability_and_adaptability") || get("scalability_and_abc")) * 0.10 +
    get("alignment_with_ethical_standards") * 0.05 +
    get("practical_application") * 0.10 +
    get("video_quality") * 0.10
  );
};

// ===== Calculate & Publish all results =====
const calculateAndPublishResults = async (req, res) => {
  try {
    const teams = await Team.find();
    if (!teams.length)
      return res.status(404).json({ success: false, message: "No teams found" });

    let results = [];

    for (const team of teams) {
      const scores = await Score.find({ teamId: team._id });
      if (!scores.length) continue;

      const totals = scores.map((s) => computeScore(s.scores));
      const averageScore = totals.reduce((a, b) => a + b, 0) / totals.length;

      // Update or create result
      let result = await Result.findOne({ teamId: team._id });
      if (result) {
        result.averageScore = Number(averageScore.toFixed(2));
        result.resultDate = new Date();
        result.isPublished = true; // ✅ publish immediately
        await result.save();
      } else {
        result = await Result.create({
          teamId: team._id,
          averageScore: Number(averageScore.toFixed(2)),
          isPublished: true, // ✅ publish immediately
        });
      }

      results.push({
        team: { name: team.teamName, lead: team.teamLeadName },
        averageScore: Number(averageScore.toFixed(2)),
      });
    }

    res.status(200).json({
      success: true,
      message: "All results calculated and published ✅",
      results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};




// how many teams have completed evaluations
// ===== Get Published Results with Completed Count =====
const getPublishedResults = async (req, res) => {
  try {
    // Fetch all published results
    const results = await Result.find({ isPublished: true }).populate(
      "teamId",
      "teamName teamLeadName"
    );

    // Count how many teams have completed evaluation (status === "evaluated")
    const completedEvaluations = results.filter(r => r.status === "evaluated").length;

    res.status(200).json({
      success: true,
      totalPublished: results.length,
      completedEvaluations,
      results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


module.exports = {
  calculateAndPublishResults,
  getPublishedResults,getPublishedResults
};
