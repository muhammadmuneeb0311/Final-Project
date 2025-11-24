const express = require("express");
const router = express.Router();
const {
  calculateAndPublishResults,
  getPublishedResults,
} = require("../../controllers/resultController");

const { authMiddleware, adminMiddleware } = require("../../middleware/authMiddleware");

// ===== ADMIN ROUTES =====

// Calculate & publish all results
router.put("/calculate-publish", authMiddleware, adminMiddleware, calculateAndPublishResults);

// Get all published results
router.get("/published", getPublishedResults);

module.exports = router;
