const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  phone: { type: String, default: null },
  role: {
    type: String,
    required: true,
    enum: ["evaluator", "team"],
    resetPasswordToken: String,
    resetPasswordExpire: Date,

    trim: true
  },
  teamName: { type: String, default: null },
  // members should be an array of subdocuments with name and email
  members: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
      isApproved: { type: Boolean, default: false },
      teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    },
  ],
  qualification: { type: String, default: null },
  specialization: { type: String, default: null },
  experience: { type: String, default: null },
  isApproved: { type: Boolean, default: false },
  activationToken: { type: String, default: null }
}, { timestamps: true });

// Pre‑validate hook
userSchema.pre('validate', function (next) {
  if (this.role === "evaluator") {
    if (!this.qualification || !this.specialization || !this.experience) {
      this.invalidate("qualification", "Qualification, specialization, and experience are required for evaluators");
    }
  } else if (this.role === "team") {
    // Role is "team"
    if (this.qualification || this.specialization || this.experience) {
      this.invalidate("qualification", "Qualification, specialization, and experience are only for evaluators");
    }
    if (!this.teamName) {
      this.invalidate("teamName", "Team name is required for team role");
    }
    if (!this.members || !this.members.length) {
      this.invalidate("members", "At least one team member is required for team role");
    }
  }
  next();
});

// Avoid OverwriteModelError
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
