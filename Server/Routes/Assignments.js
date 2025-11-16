// Routes/assignEvaluator.js
const express = require("express");
const router = express.Router();
const AssignEvaluator = require("../Models/EvaluatorAssignment");
const Submission = require("../Models/Submission");
const TeamLeader = require("../Models/Team"); // ✅ for evaluator users


module.exports = router;
