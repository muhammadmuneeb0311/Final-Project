const Team = require("../../Models/Team");
const TeamMember = require("../../Models/TeamMember");
const Submission = require("../../Models/Submission");
const Evaluator = require("../../Models/Evaluator");
const EvaluatorAssignment = require("../../Models/EvaluatorAssignment");
const User = require("../../Models/User");
const sendActivationEmail = require("../../utils/sendActivationEmail");
const crypto = require("crypto");

// ✅ Get Pending Teams & Evaluators
// ✅ Get Pending Teams & Evaluators from pending User collection
const getPendingUsers = async (req, res) => {
  try {
    const pendingUsers = await User.find({ isApproved: false });

    const pendingTeams = pendingUsers.filter(u => u.role === "team");
    const pendingEvaluators = pendingUsers.filter(u => u.role === "evaluator");

    res.json({
      teams: pendingTeams,
      evaluators: pendingEvaluators,
    });
  } catch (err) {
    console.error("Pending users error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// ✅ Approve user by moving to their collection




const approveUser = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Find pending user
    const pendingUser = await User.findById(id);
    if (!pendingUser) return res.status(404).json({ msg: "User not found" });

    let finalUser;

    // 2️⃣ Create in relevant collection
    if (pendingUser.role === "evaluator") {
      finalUser = new Evaluator({
        name: pendingUser.name,
        email: pendingUser.email,
        phone: pendingUser.phone || "0000000000",
        password: pendingUser.password || "temp1234",
        qualification: pendingUser.qualification || "",
        specialization: pendingUser.specialization || "",
        experience: pendingUser.experience || "",
        isApproved: true,
      });
      await finalUser.save();

  // Reload the saved team to ensure embedded members have teamId set by pre-save hook
  finalUser = await Team.findById(finalUser._id);
    }

    if (pendingUser.role === "team") {
      // Only include members, exclude evaluators array entirely
      finalUser = new Team({
        name: pendingUser.name,
        email: pendingUser.email,
        phone: pendingUser.phone || "0000000000",
        password: pendingUser.password || "temp1234",
        teamName: pendingUser.teamName || pendingUser.name,
        members: Array.isArray(pendingUser.members)
          ? pendingUser.members.map((m) => ({
              name: m.name,
              email: m.email,
              teamId: undefined, // pre-save hook will assign
              isApproved: false,
            }))
          : [],
        isApproved: true,
      });

      await finalUser.save();

      // 3️⃣ Create TeamMember documents
      if (Array.isArray(pendingUser.members)) {
        for (const member of pendingUser.members) {
          const activationToken = crypto.randomBytes(32).toString("hex");
          const newMember = new TeamMember({
            name: member.name,
            email: member.email,
            teamId: finalUser._id,
            teamLeaderId: finalUser._id,
            activationToken,
            approvedByLeader: false,
          });
          await newMember.save();
          await sendActivationEmail(member.email, activationToken);
        }
      }
    }

    // 4️⃣ Delete pending user
    await pendingUser.deleteOne();

    // Remove empty arrays before sending response (optional)
    const responseUser = finalUser.toObject();
    if (responseUser.evaluators?.length === 0) delete responseUser.evaluators;
    if (responseUser.members?.length === 0) delete responseUser.members;

    res.json({
      msg: "User approved and moved to relevant collection ✅",
      user: responseUser,
    });
  } catch (err) {
    console.error("Approve user error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};


// ✅ Get Approved Evaluators
const getApprovedEvaluators = async (req, res) => {
  try {
    const evaluators = await Evaluator.find({ isApproved: true });
    res.json(evaluators);
  } catch (err) {
    console.error("Approved evaluators fetch error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// ✅ Dashboard Stats
const getDashboardStatus = async (req, res) => {
  try {
    const totalTeams = await Team.countDocuments();
    const totalSubmissions = await Submission.countDocuments();
    const evaluationsCompleted = await EvaluatorAssignment.countDocuments({ status: "completed" });
    const pendingApprovals = await Team.countDocuments({ isApproved: false });

    res.json({
      totalTeams,
      totalSubmissions,
      evaluationsCompleted,
      pendingApprovals,
    });
  } catch (err) {
    console.error("Dashboard status error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
const getLatestSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
      .sort({ createdAt: -1 })
      .populate("teamId", "teamName");
    res.json(submissions);
  } catch (err) {
    console.error("Fetch latest submissions error:", err);
    res.status(500).json({ msg: "Server error fetching submissions" });
  }
};

module.exports = {
  getPendingUsers,
  approveUser,
  getApprovedEvaluators,
  getDashboardStatus,
  getLatestSubmissions
};
