const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const Team = require("../Models/Team");
const Evaluator = require("../Models/Evaluator"); // ✅ already defined in Models
const Submission = require("../Models/Submission");
const EvaluatorAssignment = require("../Models/EvaluatorAssignment");

// ✅ Get pending approvals
router.get("/pending", async (req, res) => {
  try {
    const pending = await User.find({ is_approved: false });
    res.json(pending);
  } catch (err) {
    console.error("❌ Error fetching pending approvals:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Approve user (move to correct collection)
router.put("/approve/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.is_approved = true;
    await user.save();

    if (user.role === "team") {
      const exists = await Team.findOne({ email: user.email });
      if (!exists) {
        const newTeam = new Team({
          name: user.name,
          email: user.email,
          password: user.password, // already hashed
          members: user.members || [],
          isHashed: true, // prevent rehash
        });
        await newTeam.save();
      }
    } else if (user.role === "evaluator") {
      const exists = await Evaluator.findOne({ email: user.email });
      if (!exists) {
        const newEval = new Evaluator({
          name: user.name,
          email: user.email,
          password: user.password, // already hashed
          qualification: user.qualification,
          experience: user.experience,
          isHashed: true,
        });
        await newEval.save();
      }
    }

    res.json({ msg: "User approved and moved", user });
  } catch (err) {
    console.error("❌ Approve user error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Dashboard counts
router.get("/dashboard/status", async (req, res) => {
  try {
    const totalTeams = await Team.countDocuments();
    const totalSubmissions = await Submission.countDocuments({ status: "submitted" });
    const evaluationsCompleted = await EvaluatorAssignment.countDocuments({ status: "completed" });
    const pendingApprovals = await User.countDocuments({ is_approved: false });

    res.json({ totalTeams, totalSubmissions, evaluationsCompleted, pendingApprovals });
  } catch (err) {
    console.error("❌ Dashboard status error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
