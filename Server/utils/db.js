const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    if (!URI) {
      console.error("❌ MONGODB_URI is not set. Set process.env.MONGODB_URI before starting the server.");
      process.exit(1);
    }
    await mongoose.connect(URI);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
    return; // optional, for clarity after exit
  }
};

module.exports = connectDb;
