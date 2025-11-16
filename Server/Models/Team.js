const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// ✅ Define the schema
const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    teamName: { type: String, required: true },
    role: { type: String, default: "team_lead" },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

    // ✅ Members embedded inside the team
    members: [
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        isApproved: { type: Boolean, default: false },
        teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
      },
    ],

    // Evaluator references assigned to this team
    evaluators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Evaluator",
      },
    ],

    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ✅ Hash password before saving
teamSchema.pre("save", async function (next) {
  try {
    // Hash password
    // Only hash when password is new/modified and not already a bcrypt hash
    if (this.isModified("password") && this.password) {
      const pw = this.password.toString();
      // bcrypt hashes start with $2 (e.g. $2a$, $2b$, $2y$)
      if (!pw.startsWith("$2")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(pw, salt);
      }
    }

    // Set teamId for members
    if (this.isNew && Array.isArray(this.members) && this.members.length > 0) {
      this.members = this.members.map((member) => ({
        ...member,
        teamId: this._id,
      }));
    }

    next();
  } catch (err) {
    next(err);
  }
});


// ✅ Compare password method
teamSchema.methods.comparePassword = async function (password) {
  if (!this.password) return false;
  return bcrypt.compare(password, this.password);
};

// ✅ Automatically set teamId in each member when team is created
teamSchema.pre("save", function (next) {
  if (this.isNew && this.members && this.members.length > 0) {
    this.members = this.members.map((member) => ({
      ...member,
      teamId: this._id, // assign the new team’s _id
    }));
  }
  next();
});

module.exports = mongoose.model("Team", teamSchema);
