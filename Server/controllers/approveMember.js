// controllers/team-controller.js
const User = require("../Models/user");
const Team = require("../Models/Team");

// ✅ Approve member and add to team (NO Member collection)
const approveMember = async (req, res) => {
  try {
    const { memberId } = req.params;
    const leaderId = req.user.id;

    // 1️⃣ Find the member in User collection
    const member = await User.findById(memberId);
    if (!member || member.role !== "member") {
      return res.status(404).json({ msg: "Member not found" });
    }

    // 2️⃣ Ensure leader owns this member
    if (String(member.teamLeader) !== String(leaderId)) {
      return res.status(403).json({ msg: "You are not this member's leader" });
    }

    // 3️⃣ If already approved
    if (member.is_approved && member.approvedByLeader) {
      return res.status(400).json({
        msg: "This member is already approved and added to team.",
      });
    }

    // 4️⃣ Mark approved
    member.is_approved = true;
    member.approvedByLeader = true;
    await member.save();

    // 5️⃣ Add to team (User and Team relationship)
    const team = await Team.findOne({ leader: leaderId });
    if (team) {
      if (!team.members.includes(member._id)) {
        team.members.push(member._id);
        await team.save();
      }
    }

    res.json({ msg: "Member approved successfully" });
  } catch (err) {
    console.error("Approve Member Error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
