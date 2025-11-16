const mongoose = require("mongoose");

const evaluationCriteriaSchema = new mongoose.Schema({
  criteria_name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  weightage_percent: {
    type: Number,
    required: true
  },
  max_marks: {
    type: Number,
    required: true,
    default: 10 // you can adjust this
  },
  description: {
    type: String,
    default: ""
  },
  is_active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("EvaluationCriteria", evaluationCriteriaSchema);
