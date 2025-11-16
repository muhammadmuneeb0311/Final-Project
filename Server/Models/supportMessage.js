const mongoose = require('mongoose');

const supportMessageSchema = new mongoose.Schema({
  conversation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SupportConversation', required: true },
  sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message_text: { type: String, required: true },
  attachment_link: String,
  sent_at: { type: Date, default: Date.now },
  is_read: { type: Boolean, default: false },
  sender_type: { type: String, enum: ["admin", "team", "teammember"], required: true },
  sender_name: { type: String, required: true },
});

module.exports = mongoose.model('SupportMessage', supportMessageSchema, 'support_messages');
