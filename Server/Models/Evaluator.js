const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const evaluatorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // hashed
  qualification: String,
  experience: String,
  isHashed: { type: Boolean, default: false },
});

evaluatorSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isHashed) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.isHashed = true;
  next();
});

evaluatorSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Evaluator = mongoose.model("Evaluator", evaluatorSchema);
module.exports = Evaluator;
