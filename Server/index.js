require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// Routers
const adminRouter = require("./Routes/AdminRoute");
const teamRouter = require("./Routes/TeamRoute");
const authRoutes = require("./Routes/Auth");
const submissionRoutes = require("./Routes/SubmissionRoute"); 
const userRouters = require("./Routes/UserRoutes");
// CORS setup
const corsOptions = {
  origin: "http://localhost:3000", 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

const connectDb = require("./utils/db");

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/users", userRouters);
app.use("/api/admin", adminRouter);
app.use("/api/team", teamRouter);

// Default route
app.get("/", (req, res) => res.send("🚀 Server is running"));

// Catch-all 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Connect DB and start server
connectDb().then(() => {
  const PORT = process.env.PORT || 5000;
  console.log("✅ Connected to database");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
