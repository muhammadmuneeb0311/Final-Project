const jwt = require("jsonwebtoken");
const TeamMember = require("../Models/TeamMember"); // ✅ use your existing model

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.mysecretkey);


     // 🧠 Log to confirm decoding works
    console.log("✅ Decoded Token:", decoded);

    req.user = {
      id: decoded.id,
      role: decoded.role,
      teamId: decoded.teamId
    };

    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};


// ✅ Only allow Admin users
const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role?.toLowerCase() !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};


module.exports = { authMiddleware ,adminMiddleware};
