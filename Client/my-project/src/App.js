import { Routes, Route } from "react-router-dom";
import { useAuth } from "./Components/Auth/store";
import Layout from "./Pages/Layout";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Dashboard from "./Components/Dashboard";
import ProtectedRoute from "./Components/ProtectedRoutes";
import Home from "./Pages/Home";
import UploadSubmission from "./Components/Team/UploadSubmission"; // ✅ import

function App() {
  const { userRole } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin", "evaluator", "team"]}>
            <Layout role={userRole}>
              <Dashboard role={userRole} />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* ✅ Team → Upload Submission */}
      <Route
        path="/upload"
        element={
          <ProtectedRoute allowedRoles={["team"]}>
            <Layout role={userRole}>
              <UploadSubmission />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Default fallback */}
      <Route path="/*" element={<Login />} />
    </Routes>
  );
}

export default App;
