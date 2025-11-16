const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  evaluatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Evaluator",
    required: true,
  },
  scores: {
    // Dynamic criteria: use a Map so criteria can be added/removed without schema changes
    type: Map,
    of: Number,
  },
  totalScore: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

scoreSchema.index({ teamId: 1, evaluatorId: 1 }, { unique: true }); 
// ✅ Prevent duplicate scoring by same evaluator for same team

module.exports = mongoose.model("Score", scoreSchema);
