const express = require("express");
const router = express.Router();
const { authMiddleware} = require("../middleware/authMiddleware");
const supportController = require("../controllers/supportController");
// Only logged-in users can create a conversation
router.post("/conversation", authMiddleware, supportController.createConversation);

// Get conversations depends on role
router.get("/conversation/:user_id/:role", authMiddleware, supportController.getConversations);

// Get messages for a conversation
router.get("/messages/:conversation_id", authMiddleware, supportController.getMessages);

// Send a message
router.post("/messages", authMiddleware, supportController.sendMessage);


module.exports = router;
