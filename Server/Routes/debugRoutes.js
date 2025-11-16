const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const sendActivationEmail = require('../utils/sendActivationEmail');
const Team = require('../Models/Team');
const Submission = require('../Models/Submission');
const Evaluator = require('../Models/Evaluator');
const Assignment = require('../Models/EvaluatorAssignment');

// GET /api/debug/email-status
// Returns transporter verification status for quick debugging
router.get('/email-status', authMiddleware, async (req, res) => {
  try {
    // Only allow admin or team roles to access this debug info
    if (!req.user || !['admin','team'].includes((req.user.role || '').toLowerCase())) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const transporter = sendActivationEmail.transporter;
    if (!transporter) return res.status(500).json({ msg: 'Transpoter not available' });

    transporter.verify((err, success) => {
      if (err) {
        console.error('transporter.verify error:', err);
        return res.status(500).json({ ok: false, error: err.message || err });
      }
      return res.json({ ok: true, message: 'Email transporter ready', info: success });
    });
  } catch (err) {
    console.error('email-status route error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});


// GET /api/debug/assign-check/:teamId/:submissionId
// Returns quick diagnostics for the assign-evaluators flow
router.get('/assign-check/:teamId/:submissionId', authMiddleware, async (req, res) => {
  try {
    const { teamId, submissionId } = req.params;

    const [team, submission, approvedCount, existingAssignments] = await Promise.all([
      Team.findById(teamId).lean(),
      Submission.findById(submissionId).lean(),
      Evaluator.countDocuments({ isApproved: true }),
      Assignment.find({ submissionId }).lean(),
    ]);

    res.json({
      ok: true,
      teamExists: !!team,
      team,
      submissionExists: !!submission,
      submission,
      approvedEvaluatorsCount: approvedCount,
      existingAssignmentsCount: (existingAssignments || []).length,
      existingAssignments,
    });
  } catch (err) {
    console.error('assign-check error:', err);
    res.status(500).json({ ok: false, message: 'Error running assign-check', error: err.message });
  }
});

module.exports = router;

