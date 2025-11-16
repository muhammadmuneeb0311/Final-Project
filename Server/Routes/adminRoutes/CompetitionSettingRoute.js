const express = require("express");
const router = express.Router();
const {
  createSetting,
  getSettings,
  getSettingById,
  updateSetting,
  deleteSetting,
} = require("../../controllers/admin/competitionSettingController");
const { authMiddleware, adminMiddleware } = require("../../middleware/authMiddleware");

// ✅ Routes
router.post("/", authMiddleware, adminMiddleware, createSetting);
router.get("/", getSettings);
router.get("/:id", getSettingById);
router.put("/:id", authMiddleware, adminMiddleware, updateSetting);
router.delete("/:id", authMiddleware, adminMiddleware, deleteSetting);

module.exports = router;