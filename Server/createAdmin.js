// createAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./Models/Admin"); // adjust path if needed

// ✅ Connect to your MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/your_db_name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

async function createAdmin() {
  const hashedPassword = await bcrypt.hash("1234567", 10);

  await Admin.updateOne(
    { email: "admin@gmail.com" },
    {
      $set: {
        email: "admin@gmail.com",
        password:1234567,
        designation: "admin",
        privileges: "full access",
      }
    },
    { upsert: true } // creates if it doesn't exist
  );

  console.log("Admin ready for login!");
  mongoose.disconnect(); // disconnect after done
}

createAdmin();
