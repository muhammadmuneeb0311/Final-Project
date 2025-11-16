const express = require("express");
const router = express.Router();
const { assignEvaluators, getAssignedSubmissions, evaluateSubmission } = require("../../controllers/admin/assignEvaluatorController");
const { authMiddleware, adminMiddleware } = require("../../middleware/authMiddleware");


// Admin assigns evaluators
router.post(
  "/assign/:teamId/:submissionId",
  authMiddleware,
  adminMiddleware,
  assignEvaluators
);

// Evaluator updates evaluation status
router.put("/evaluate/:assignmentId", authMiddleware, evaluateSubmission);

// Get assigned submissions for evaluator
router.get("/assigned", authMiddleware, getAssignedSubmissions);

module.exports = router;
