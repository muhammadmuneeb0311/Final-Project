const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String },
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    teamLeaderId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    isApproved: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    approvedByLeader: { type: Boolean, default: false },
    role: { type: String, default: "team_member" },
    activationToken: { type: String },
  },
  { timestamps: true }
);



// Compare password
teamMemberSchema.methods.comparePassword = async function (password) {
  if (!this.password) return false;
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("TeamMember", teamMemberSchema);
