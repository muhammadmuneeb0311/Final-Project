const express = require("express");
const router = express.Router();
const {
  getDashboardStatus,
  getPendingUsers,
  getApprovedEvaluators,
  approveUser,
  getLatestSubmissions,  
} = require("../../controllers/admin/admin-controller.js");


router.get("/dashboard/status", getDashboardStatus);
router.get("/pending", getPendingUsers);
router.get("/approved-evaluators", getApprovedEvaluators);
router.put("/approve/:id", approveUser);
router.get("/submissions/latest", getLatestSubmissions); 

module.exports = router;