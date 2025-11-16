const mongoose = require("mongoose");

const competitionSettingsSchema = new mongoose.Schema({
  settingName: { type: String, required: true },
  settingValue: { type: String, required: true },
  description: { type: String },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model("CompetitionSetting", competitionSettingsSchema);
