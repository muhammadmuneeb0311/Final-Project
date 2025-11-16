const CompetitionSetting =  require("../../Models//CompetitionSettings");

// ✅ Create new competition setting
// ✅ Create new competition setting
exports.createSetting = async (req, res) => {
  try {
    const { settingName, settingValue, start_date, end_date, description } = req.body;

    // ✅ Validate dates
    if (new Date(start_date) >= new Date(end_date)) {
      return res.status(400).json({ message: "Start date must be before end date!" });
    }

    const newSetting = new CompetitionSetting({
      settingName,
      settingValue,
      start_date,
      end_date,
      description,
    });

    await newSetting.save();

    res.status(201).json({
      message: "Competition setting created successfully ✅",
      newSetting,
    });
  } catch (error) {
    console.error("❌ Error creating competition setting:", error);
    res.status(500).json({
      message: "Server Error ❌",
      error: error.message,
    });
  }
};



// ✅ Get all competition settings
exports.getSettings = async (req, res) => {
  try {
    const settings = await CompetitionSetting.find().sort({ createdAt: -1 });
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: "Server Error ❌", error: error.message });
  }
};

// ✅ Get single setting
exports.getSettingById = async (req, res) => {
  try {
    const setting = await CompetitionSetting.findById(req.params.id);
    if (!setting) return res.status(404).json({ message: "Setting not found ❌" });
    res.status(200).json(setting);
  } catch (error) {
    res.status(500).json({ message: "Server Error ❌", error: error.message });
  }
};

// ✅ Update competition setting
exports.updateSetting = async (req, res) => {
  try {
    const updated = await CompetitionSetting.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: "Competition setting updated ✅", updated });
  } catch (error) {
    res.status(500).json({ message: "Server Error ❌", error: error.message });
  }
};

// ✅ Delete competition setting
exports.deleteSetting = async (req, res) => {
  try {
    await CompetitionSetting.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Competition setting deleted ✅" });
  } catch (error) {
    res.status(500).json({ message: "Server Error ❌", error: error.message });
  }
};
