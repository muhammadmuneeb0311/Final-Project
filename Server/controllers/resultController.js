const Team = require("../Models/Team");
const Result = require("../Models/Result");
const Score = require("../Models/EvaluationScore");

// ===== Helper: Calculate weighted score =====
// ===== Helper: Calculate weighted score =====
const computeScore = (scores) => {
  if (!scores) return 0;

  // convert Mongoose subdocument / Map to plain object
  if (typeof scores.get === "function") {
    scores = Object.fromEntries(scores.entries());
  }

  // if it's still a Mongoose document
  if (scores.toObject) scores = scores.toObject();

  // direct total if available
  if (scores.totalScore) return Number(scores.totalScore);

  const get = (key) => Number(scores[key] || 0);

  // weighted total based on evaluation criteria
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


// ===== Calculate results for all teams =====
const calculateResults = async (req, res) => {
  try {
    const teams = await Team.find();
    if (!teams.length)
      return res.status(404).json({ success: false, message: "No teams found" });

    let results = [];

    for (const team of teams) {
      const scores = await Score.find({ teamId: team._id });
      if (!scores.length) continue;

      // compute all totals
      const totals = scores.map((s) => computeScore(s.scores));
      const averageScore = totals.reduce((a, b) => a + b, 0) / totals.length;

      // update or create result entry
      let result = await Result.findOne({ teamId: team._id });
      if (result) {
        result.averageScore = Number(averageScore.toFixed(2));
        result.resultDate = new Date();
        await result.save();
      } else {
        result = await Result.create({
          teamId: team._id,
          averageScore: Number(averageScore.toFixed(2)),
        });
      }

      results.push({
        team: { name: team.teamName, lead: team.teamLeadName },
        averageScore: Number(averageScore.toFixed(2)),
      });
    }

    res.status(200).json({ success: true, results });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// ===== Calculate single team result =====
const calculateSingleTeamResult = async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await Team.findById(teamId);
    if (!team)
      return res.status(404).json({ success: false, message: "Team not found" });

    const scores = await Score.find({ teamId });
    if (!scores.length)
      return res
        .status(400)
        .json({ success: false, message: "Team has no scores" });

    const totals = scores.map((s) => computeScore(s.scores));
    const averageScore = totals.reduce((a, b) => a + b, 0) / totals.length;

    let result = await Result.findOne({ teamId });
    if (result) {
      result.averageScore = Number(averageScore.toFixed(2));
      result.resultDate = new Date();
      await result.save();
    } else {
      result = await Result.create({
        teamId,
        averageScore: Number(averageScore.toFixed(2)),
      });
    }

    res.status(200).json({
      success: true,
      team: { name: team.teamName, lead: team.teamLeadName },
      averageScore: Number(averageScore.toFixed(2)),
      evaluatorTotals: totals.map((t, i) => ({
        evaluator: i + 1,
        totalScore: Number(t.toFixed(2)),
      })),
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// ===== Publish all results =====
const publishResults = async (req, res) => {
  try {
    await Result.updateMany({}, { isPublished: true }); // <-- use correct field name
    res.status(200).json({ success: true, message: "All results published ✅" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};


const getPublishedResults = async (req, res) => {
  try {
    const results = await Result.find({ isPublished: true }).populate(
      "teamId",
      "teamName teamLeadName"
    );
    res.status(200).json({ success: true, results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


module.exports = {
  calculateResults,
  calculateSingleTeamResult,
  publishResults,
  getPublishedResults,
};
