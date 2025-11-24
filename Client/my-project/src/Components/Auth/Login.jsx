import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../store";
import { jwtDecode } from "jwt-decode"; 
import axios from "axios";
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';

const URL = "http://localhost:5000/api/auth/login";

const Login = () => {
  const [team, setTeam] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { saveToken, token, userRole } = useAuth();
  const navigate = useNavigate();

  // 🔹 Redirect based on role
  const redirectByRole = useCallback(
    (role) => {
      switch (role.toLowerCase()) {
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
    <>
      {/* Bootstrap Icons */}
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" 
        rel="stylesheet" 
      />

      <div className="bg-gradient-primary min-vh-100 d-flex align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col lg={5} md={7} sm={9}>
              {/* Brand Header */}
              <div className="text-center mb-5">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <div className="bg-white rounded-circle p-3 shadow">
                    <i className="bi bi-lightning-charge-fill text-primary fs-2"></i>
                  </div>
                </div>
                <h2 className="text-white fw-bold">ContentEval</h2>
                <p className="text-white-50">Automated Content Evaluation System</p>
              </div>

              {/* Login Card */}
              <Card className="border-0 shadow-lg">
                <Card.Body className="p-5">
                  {/* Card Header */}
                  <div className="text-center mb-4">
                    <h3 className="fw-bold text-primary">
                      <i className="bi bi-box-arrow-in-right me-2"></i>
                      Welcome Back
                    </h3>
                    <p className="text-muted">Sign in to your account to continue</p>
                  </div>

                  {/* Error Alert */}
                  {error && (
                    <Alert variant="danger" className="d-flex align-items-center">
                      <i className="bi bi-exclamation-triangle-fill me-2"></i>
                      {error}
                    </Alert>
                  )}

                  {/* Login Form */}
                  <Form onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">
                        <i className="bi bi-envelope me-2"></i>
                        Email Address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={team.email}
                        onChange={handleInput}
                        placeholder="Enter your email"
                        required
                        size="lg"
                        className="py-3 border-2"
                      />
                    </Form.Group>

                    {/* Password Field */}
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">
                        <i className="bi bi-lock me-2"></i>
                        Password
                      </Form.Label>
                      <div className="position-relative">
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={team.password}
                          onChange={handleInput}
                          placeholder="Enter your password"
                          required
                          size="lg"
                          className="py-3 border-2 pe-5"
                        />
                        <Button
                          variant="link"
                          className="position-absolute top-50 end-0 translate-middle-y text-muted"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                        </Button>
                      </div>
                    </Form.Group>

                    {/* Remember Me & Forgot Password */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check
                        type="checkbox"
                        id="remember-me"
                        label="Remember me"
                        className="text-muted"
                      />
                      <Link 
                        to="/forgot-password" 
                        className="text-decoration-none text-primary fw-semibold"
                      >
                        <i className="bi bi-key me-1"></i>
                        Forgot Password?
                      </Link>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={loading}
                      className="w-100 py-3 fw-semibold fs-5"
                    >
                      {loading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Signing In...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-box-arrow-in-right me-2"></i>
                          Sign In
                        </>
                      )}
                    </Button>
                  </Form>

                  {/* Divider */}
                  <div className="text-center my-4">
                    <div className="bg-light" style={{height: '1px'}}></div>
                    <span className="bg-white px-3 text-muted small">or continue with</span>
                  </div>

                  {/* Social Login Options */}
                  <div className="d-grid gap-2 mb-4">
                    <Button variant="outline-dark" size="lg" className="py-2">
                      <i className="bi bi-google me-2"></i>
                      Continue with Google
                    </Button>
                    <Button variant="outline-primary" size="lg" className="py-2">
                      <i className="bi bi-microsoft me-2"></i>
                      Continue with Microsoft
                    </Button>
                  </div>

                  {/* Registration Link */}
                  <div className="text-center">
                    <p className="text-muted mb-0">
                      Don't have an account?{" "}
                      <Link 
                        to="/register" 
                        className="text-decoration-none fw-semibold text-primary"
                      >
                        <i className="bi bi-person-plus me-1"></i>
                        Create Account
                      </Link>
                    </p>
                  </div>
                </Card.Body>
              </Card>

              {/* Footer Links */}
              <div className="text-center mt-4">
                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <Link to="/privacy" className="text-white-50 text-decoration-none small">
                    Privacy Policy
                  </Link>
                  <Link to="/terms" className="text-white-50 text-decoration-none small">
                    Terms of Service
                  </Link>
                  <Link to="/support" className="text-white-50 text-decoration-none small">
                    Support
                  </Link>
                </div>
                <p className="text-white-50 small mt-2">
                  © {new Date().getFullYear()} ContentEval. All rights reserved.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .bg-gradient-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        }
        .min-vh-100 {
          min-height: 100vh;
        }
        .border-2 {
          border-width: 2px !important;
        }
        .card {
          border-radius: 1rem;
        }
        .form-control:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
        }
      `}</style>
    </>
  );
};

export default Login;