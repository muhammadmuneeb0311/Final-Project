const User = require("../Models/User");
const jwt = require("jsonwebtoken");

// ================== HOME ==================
const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to the home page!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

// ================== Helper: Generate JWT ==================
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.mysecretkey,   // ✅ use one env key
    { expiresIn: "1h" }
  );
};

// ================== REGISTER ==================
const register = async (req, res) => {
  try {
    console.log("Incoming data:", req.body);

    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password || !role) {
      return res.status(400).json({
        message: "Name, Email, Phone, Password and Role are required",
      });
    }

    if (role === "admin") {
      return res.status(403).json({
        message: "Admin accounts cannot be self-registered. Please contact system administrator.",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user (password hashed by schema)
    const userCreated = new User(req.body);
    await userCreated.save();

    res.status(201).json({
      msg: "User registered successfully (waiting for admin approval)",
      token: generateToken(userCreated),
      userId: userCreated._id.toString(),
      data: userCreated,
    });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
// ================== LOGIN ==================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    // 🔹 Only check approval for team and evaluator
    if ((user.role === "team" || user.role === "evaluator") && !user.is_approved) {
      return res.status(403).json({ msg: "Your account is not approved yet" });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    // Generate JWT
    const token = generateToken(user);

    // Send response
    res.json({
      msg: "Login successful",
      token,
      role: user.role,
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ msg: "Internal Server Error", error: error.message });
  }
};


module.exports = { home, register, login };
