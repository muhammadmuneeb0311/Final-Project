const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const EvaluatorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  qualification: { type: String },
  experience: { type: String },
  specialization: { type: String },
  email: { type: String, required: true, unique: true },
  isApproved: { type: Boolean, default: false },
  role: { type: String, default: "evaluator" },
  password: { type: String, required: true },
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  resetPasswordToken: String,
  resetPasswordExpire: Date,

}, { timestamps: true });



// ✅ Hash password before saving
EvaluatorSchema.pre("save", async function (next) {
  // Only hash if password is new or modified
  if (!this.isModified("password")) return next();

  try {
    const pw = this.password ? this.password.toString() : "";
    // Skip hashing if it already looks like a bcrypt hash
    if (pw.startsWith("$2")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(pw, salt);
    next();
  } catch (err) {
    next(err);
  }
});





module.exports = mongoose.model("Evaluator", EvaluatorSchema);