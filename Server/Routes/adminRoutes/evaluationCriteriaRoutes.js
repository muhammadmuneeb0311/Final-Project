const express = require("express");
const router = express.Router();
const { addCriteria, getAllCriteriaForAdmin, updateCriteria, deleteCriteria, getActiveCriteria } = require("../../controllers/admin/evaluationCriteriaController");
const { authMiddleware, adminMiddleware } = require("../../middleware/authMiddleware");

// 🧑‍💼 Admin routes
router.post("/add", authMiddleware, adminMiddleware, addCriteria);
router.get("/admin", authMiddleware, adminMiddleware, getAllCriteriaForAdmin); 
router.put("/:id", authMiddleware, adminMiddleware, updateCriteria);
router.delete("/:id", authMiddleware, adminMiddleware, deleteCriteria);

// Public (authenticated) route for evaluators and other users to fetch active criteria
router.get("/", authMiddleware, getActiveCriteria);

module.exports = router;