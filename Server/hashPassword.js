const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const TeamMember = require("./Models/TeamMember");

const run = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://muhammadmuneeb031173:sfLkgzkUhkCXWHYj@cluster0.7imp3i5.mongodb.net/content_eval_db?retryWrites=true&w=majority&appName=Cluster0"
    );

    const hash = await bcrypt.hash("1234567", 10);
    const result = await TeamMember.updateOne(
      { email: "m9386056@gmail.com" },
      { $set: { password: hash } } // ✅ correct
    );

    console.log("✅ Update result:", result);
    console.log("Password reset successful!");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await mongoose.disconnect();
  }
};

run();
