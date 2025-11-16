const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../Models/User");

// ✅ Activate account and set password
router.post("/activate", async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ msg: "Token and password are required" });
    }

    // Find user with this token
    const user = await User.findOne({ activationToken: token, role: "member" });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired activation token" });
    }

    // Hash and save password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.is_approved = true;
    user.activationToken = null; // clear token
    await user.save();

    res.json({ msg: "Account activated successfully! You can now log in." });
  } catch (err) {
    console.error("Activation error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;