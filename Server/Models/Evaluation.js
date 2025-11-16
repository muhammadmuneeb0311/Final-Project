const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema({
  submissionId: { type: mongoose.Schema.Types.ObjectId, ref: "Submission", required: true },
  evaluatorId: { type: mongoose.Schema.Types.ObjectId, ref: "Evaluator", required: true },
  evaluationDate: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "in_progress", "completed"], default: "pending" },
  generalComments: { type: String },
  totalScore: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Evaluation", evaluationSchema);
