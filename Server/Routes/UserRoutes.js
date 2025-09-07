const express = require("express");
const router = express.Router();
const User = require("../Models/User");

// GET user by ID (include team info)
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("team", "name");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      userId: user._id,
      name: user.name,
      email: user.email,
      teamId: user.team?._id || null,
      teamName: user.team?.name || null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching user info" });
  }
});

module.exports = router;
