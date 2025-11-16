import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../store";
import {jwtDecode} from "jwt-decode"; 
import axios from "axios";

const URL = "http://localhost:5000/api/auth/login";

const Login = () => {
  const [team, setTeam] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { saveToken, token, userRole } = useAuth();
  const navigate = useNavigate();

  // 🔹 Redirect based on role
  const redirectByRole = useCallback(
    (role) => {
      switch (role.toLowerCase()) { // normalize role
        case "admin":
        case "evaluator":
        case "team":
        case "teammember":
          navigate("/dashboard", { replace: true });
          break;
        default:
          navigate("/login", { replace: true });
      }
    },
    [navigate]
  );

  // 🔹 Auto-redirect if already logged in
  useEffect(() => {
    if (token && userRole) {
      redirectByRole(userRole);
    }
  }, [token, userRole, redirectByRole]);

  // 🔹 Input handler
  const handleInput = (e) => {
    const { name, value } = e.target;
    setTeam((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post(URL, team, {
        headers: { "Content-Type": "application/json" },
      });

      if (data.token) {
        const decoded = jwtDecode(data.token);
        const role = decoded.role?.toLowerCase() || "member";
        const teamIdFromToken = decoded.teamId || null;

        // Save token + role
        saveToken(data.token, role, teamIdFromToken);

        // 🔹 Redirect immediately
        redirectByRole(role);
      } else {
        setError(data.msg || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Network error");
      console.error(err.response?.data || err);
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Login</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={team.email}
                  onChange={handleInput}
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  value={team.password}
                  onChange={handleInput}
                  className="form-control"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {/* 🔹 Forgot Password Link */}
              <div className="mb-3 text-end">
                <Link to="/forgot-password" className="text-decoration-none">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-center mt-3">
              Don’t have an account?{" "}
              <Link to="/register" className="text-decoration-none">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
