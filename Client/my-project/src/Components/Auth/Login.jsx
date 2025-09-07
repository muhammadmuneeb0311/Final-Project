import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./store";
import { jwtDecode } from "jwt-decode";

const URL = "http://localhost:5000/api/auth/login";

const Login = () => {
  const [team, setTeam] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { saveToken, token, userRole } = useAuth();
  const navigate = useNavigate();

  // ✅ Helper: redirect by role
  const redirectByRole = useCallback(
    (role) => {
      if (!role) {
        navigate("/login");
        return;
      }
      switch (role) {
        case "admin":
          navigate("/dashboard");
          break;
        case "evaluator":
          navigate("/dashboard");
          break;
        case "team":
          navigate("/dashboard");
          break;
        default:
          navigate("/login");
      }
    },
    [navigate]
  );

  // ✅ Auto-redirect if already logged in
  useEffect(() => {
    if (token && userRole) {
      redirectByRole(userRole);
    }
  }, [token, userRole, redirectByRole]);

  // ✅ Input handler
  const handleInput = (e) => {
    const { name, value } = e.target;
    setTeam((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(team),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (response.ok && data.token) {
        const decoded = jwtDecode(data.token);
        console.log("Decoded JWT 👉", decoded);

        const role = decoded.role || "team"; // fallback role

        // ✅ Save token + role in context + localStorage
        saveToken(data.token, role);

        // ✅ Immediately redirect
        redirectByRole(role);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error");
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
