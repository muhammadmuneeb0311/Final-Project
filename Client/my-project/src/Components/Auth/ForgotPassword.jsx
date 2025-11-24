import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';

const FORGOT_PASSWORD_URL = "http://localhost:5000/api/auth/forgot-password";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const { data } = await axios.post(FORGOT_PASSWORD_URL, { email }, {
        headers: { "Content-Type": "application/json" }
      });

      setMessage(data.msg || "Password reset link sent to your email.");
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong. Please try again.");
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
                <p className="text-white-50">Reset Your Password</p>
              </div>

              {/* Forgot Password Card */}
              <Card className="border-0 shadow-lg">
                <Card.Body className="p-5">
                  {/* Card Header */}
                  <div className="text-center mb-4">
                    <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                         style={{width: '80px', height: '80px'}}>
                      <i className="bi bi-key text-primary fs-1"></i>
                    </div>
                    <h3 className="fw-bold text-primary">Forgot Password?</h3>
                    <p className="text-muted">
                      Enter your email address and we'll send you a link to reset your password.
                    </p>
                  </div>

                  {/* Success Alert */}
                  {message && (
                    <Alert variant="success" className="d-flex align-items-center">
                      <i className="bi bi-check-circle-fill me-2 fs-5"></i>
                      <div>
                        <strong>Success!</strong> {message}
                      </div>
                    </Alert>
                  )}

                  {/* Error Alert */}
                  {error && (
                    <Alert variant="danger" className="d-flex align-items-center">
                      <i className="bi bi-exclamation-triangle-fill me-2"></i>
                      {error}
                    </Alert>
                  )}

                  {/* Reset Form */}
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-semibold">
                        <i className="bi bi-envelope me-2"></i>
                        Email Address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your registered email address"
                        required
                        size="lg"
                        className="py-3 border-2"
                      />
                      <Form.Text className="text-muted">
                        We'll send a password reset link to this email.
                      </Form.Text>
                    </Form.Group>

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
                          Sending Reset Link...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-send-check me-2"></i>
                          Send Reset Link
                        </>
                      )}
                    </Button>
                  </Form>

                  {/* Additional Help */}
                  <div className="bg-light rounded p-3 mt-4">
                    <div className="d-flex align-items-start">
                      <i className="bi bi-info-circle text-primary mt-1 me-2"></i>
                      <div>
                        <small className="text-muted">
                          <strong>Didn't receive the email?</strong> Check your spam folder or ensure you entered the correct email address.
                        </small>
                      </div>
                    </div>
                  </div>

                  {/* Back to Login */}
                  <div className="text-center mt-4">
                    <p className="text-muted mb-0">
                      <i className="bi bi-arrow-left me-1"></i>
                      Back to{" "}
                      <Link 
                        to="/login" 
                        className="text-decoration-none fw-semibold text-primary"
                      >
                        Sign In
                      </Link>
                    </p>
                  </div>
                </Card.Body>
              </Card>

              {/* Support Links */}
              <div className="text-center mt-4">
                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <Link to="/support" className="text-white-50 text-decoration-none small">
                    <i className="bi bi-question-circle me-1"></i>
                    Need Help?
                  </Link>
                  <Link to="/contact" className="text-white-50 text-decoration-none small">
                    <i className="bi bi-headset me-1"></i>
                    Contact Support
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

export default ForgotPassword;