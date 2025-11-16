const mongoose = require("mongoose");




const assignmentSchema = new mongoose.Schema({
  submissionId: { type: mongoose.Schema.Types.ObjectId, ref: "Submission", required: true },
  evaluatorId: { type: mongoose.Schema.Types.ObjectId, ref: "Evaluator", required: true },
  assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
  assignedDate: { type: Date, default: Date.now },
  status: { type: String, enum: ["assigned", "completed"], default: "assigned" },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Assignment", assignmentSchema);
