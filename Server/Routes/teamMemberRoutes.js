const express = require("express");
const router = express.Router();
const { login } = require("../controllers/auth-controllers");

// Team Member Login
router.post("/login", login);

module.exports = router;
