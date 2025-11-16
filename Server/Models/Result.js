const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  averageScore: { type: Number, required: true },
  rankPosition: { type: Number },
  resultDate: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Result", resultSchema);
