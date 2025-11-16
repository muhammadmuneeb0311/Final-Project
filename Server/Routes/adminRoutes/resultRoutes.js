const express = require("express");
const router = express.Router();
const {
  calculateResults,
  calculateSingleTeamResult,
  publishResults,
  getPublishedResults,
} = require("../../controllers/resultController");

const { authMiddleware, adminMiddleware  } = require("../../middleware/authMiddleware");


// ===== ADMIN ROUTES =====

// Calculate results for all teams
router.post("/calculate", authMiddleware, adminMiddleware, calculateResults);

// Calculate result for a single team
router.post("/calculate/:teamId", authMiddleware, adminMiddleware, calculateSingleTeamResult);

// Publish all results
router.post("/publish", authMiddleware, adminMiddleware, publishResults);

// Get all published results (public route)
router.get("/published", getPublishedResults);

module.exports = router;
