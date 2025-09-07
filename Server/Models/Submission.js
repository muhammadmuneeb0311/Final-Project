const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    description: { type: String, required: true },
    learningOutcome: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Submission || mongoose.model("Submission", submissionSchema);
