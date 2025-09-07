const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  submission: { type: mongoose.Schema.Types.ObjectId, ref: "Submission" },
  evaluator: { type: mongoose.Schema.Types.ObjectId, ref: "Evaluator" },
  status: { type: String, enum: ["pending", "completed"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("EvaluatorAssignment", assignmentSchema);
