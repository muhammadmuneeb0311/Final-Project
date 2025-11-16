const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  videoLink: { type: String, required: true },
  topic: { type: String, required: true },
  learningOutcomes: { type: String },
  description: { type: String },
  status: { 
    type: String, 
    enum: ["draft", "submitted", "under_evaluation", "evaluated"], 
    default: "draft" 
  },
  deadline: { type: Date },
  isFinalSubmission: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Submission", submissionSchema);
