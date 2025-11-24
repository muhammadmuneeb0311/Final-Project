import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../store";
import axios from "axios";
import { Container, Row, Col, Card, Button, Badge, ProgressBar, ListGroup } from 'react-bootstrap';

const TeamMemberDashboard = () => {
  const { token, teamId: contextTeamId } = useAuth();
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(true);
  const [teamData, setTeamData] = useState({
    submissionStatus: "Not Submitted",
    currentScore: 0,
    maxScore: 100,
    rank: 0,
    totalTeams: 0,
    evaluatorsAssigned: [],
    submissionDate: "",
    deadline: "2025-04-10"
  });

  const decodedTeamId = useMemo(() => contextTeamId || localStorage.getItem("teamId") || "", [contextTeamId]);

  const axiosInstance = useMemo(() => 
    axios.create({
      baseURL: "http://localhost:5000/api",
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    }), [token]
  );

  useEffect(() => {
    const fetchTeamData = async () => {
      if (!token || !decodedTeamId) return;
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/teams/by-member/${decodedTeamId}`);
        setTeamName(res.data.name || "Unknown Team");
        // Mock additional team data - replace with actual API calls
        setTeamData({
          submissionStatus: res.data.submissionStatus || "Not Submitted",
          currentScore: res.data.currentScore || 0,
          maxScore: 100,
          rank: res.data.rank || 0,
          totalTeams: res.data.totalTeams || 0,
          evaluatorsAssigned: res.data.evaluatorsAssigned || ["Dr. Smith", "Prof. Johnson"],
          submissionDate: res.data.submissionDate || "",
          deadline: "2025-04-10"
        });
      } catch {
        setTeamName("N/A");
      } finally {
        setLoading(false);
      }
    };
    fetchTeamData();
  }, [token, decodedTeamId, axiosInstance]);

  const myContributions = [
    "Research on Machine Learning algorithms",
    "Video script writing and storyboarding",
    "Technical content development",
    "Presentation slides preparation",
    "Quality assurance testing"
  ];

  const recentActivities = [
    "Team meeting - Discussed project progress",
    "Updated technical documentation",
    "Reviewed video content quality",
    "Submitted progress report",
    "Coordinated with team members"
  ];

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Bootstrap Icons */}
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" 
        rel="stylesheet" 
      />

      <div className="bg-light min-vh-100">
        <Container fluid className="py-4">
          {/* Header Section */}
          <Row className="mb-4">
            <Col>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h1 className="h2 fw-bold text-primary mb-1">
                    <i className="bi bi-speedometer2 me-2"></i>
                    Team Member Dashboard
                  </h1>
                  <p className="text-muted mb-0">Welcome to your content evaluation workspace</p>
                </div>
                <Badge bg="primary" className="fs-6">
                  <i className="bi bi-person me-1"></i>
                  Team Member
                </Badge>
              </div>
            </Col>
          </Row>

          {/* Main Dashboard Content */}
          <Row className="g-4">
            {/* Team Information Card */}
            <Col lg={8}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Header className="bg-white py-3">
                  <h5 className="mb-0 fw-bold text-primary">
                    <i className="bi bi-people me-2"></i>
                    Team Information
                  </h5>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <div className="mb-4">
                        <h6 className="text-muted mb-2">Team Details</h6>
                        <div className="d-flex align-items-center mb-3">
                          <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                            <i className="bi bi-people-fill text-primary"></i>
                          </div>
                          <div>
                            <strong className="d-block fs-5">{teamName || "Loading..."}</strong>
                            <small className="text-muted">Team Name</small>
                          </div>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                          <div className="bg-info bg-opacity-10 rounded-circle p-2 me-3">
                            <i className="bi bi-tag text-info"></i>
                          </div>
                          <div>
                            <strong className="d-block">{decodedTeamId || "N/A"}</strong>
                            <small className="text-muted">Team ID</small>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h6 className="text-muted mb-3">Submission Status</h6>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span>Current Status:</span>
                          <Badge bg={teamData.submissionStatus === "Submitted" ? "success" : "warning"} className="fs-6">
                            {teamData.submissionStatus}
                          </Badge>
                        </div>
                        {teamData.submissionDate && (
                          <div className="d-flex justify-content-between align-items-center">
                            <span>Submitted On:</span>
                            <strong>{teamData.submissionDate}</strong>
                          </div>
                        )}
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className="mb-4">
                        <h6 className="text-muted mb-3">Performance Score</h6>
                        <div className="text-center">
                          <div className="position-relative d-inline-block">
                            <div className="bg-primary bg-opacity-10 rounded-circle p-4">
                              <h2 className="fw-bold text-primary mb-0">{teamData.currentScore}</h2>
                              <small className="text-muted">/ {teamData.maxScore}</small>
                            </div>
                          </div>
                          <div className="mt-3">
                            <ProgressBar 
                              now={teamData.currentScore} 
                              variant="primary" 
                              className="mb-2"
                              style={{height: '8px'}}
                            />
                            <div className="d-flex justify-content-between">
                              <small className="text-muted">Current Score</small>
                              <small className="text-muted">{teamData.currentScore}%</small>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-center">
                        <Badge bg="secondary" className="fs-6 p-2">
                          Rank {teamData.rank} of {teamData.totalTeams} Teams
                        </Badge>
                      </div>
                    </Col>
                  </Row>

                  {/* Evaluators Section */}
                  {teamData.evaluatorsAssigned.length > 0 && (
                    <div className="mt-4">
                      <h6 className="text-muted mb-3">
                        <i className="bi bi-person-check me-2"></i>
                        Assigned Evaluators
                      </h6>
                      <div className="row g-2">
                        {teamData.evaluatorsAssigned.map((evaluator, index) => (
                          <div key={index} className="col-md-6">
                            <div className="card border-0 bg-light">
                              <div className="card-body py-2">
                                <div className="d-flex align-items-center">
                                  <i className="bi bi-person-badge text-success me-2"></i>
                                  <span className="small">{evaluator}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>

            {/* Quick Actions & Timeline */}
            <Col lg={4}>
              <Card className="border-0 shadow-sm mb-4">
                <Card.Header className="bg-white py-3">
                  <h5 className="mb-0 fw-bold text-warning">
                    <i className="bi bi-lightning me-2"></i>
                    Quick Actions
                  </h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-grid gap-2">
                    <Button variant="primary" className="d-flex align-items-center justify-content-center py-2">
                      <i className="bi bi-eye me-2"></i>
                      View Submission
                    </Button>
                    <Button variant="outline-primary" className="d-flex align-items-center justify-content-center py-2">
                      <i className="bi bi-chat-dots me-2"></i>
                      Contact Team Lead
                    </Button>
                    <Button variant="outline-success" className="d-flex align-items-center justify-content-center py-2">
                      <i className="bi bi-trophy me-2"></i>
                      View Leaderboard
                    </Button>
                    <Button variant="outline-info" className="d-flex align-items-center justify-content-center py-2">
                      <i className="bi bi-download me-2"></i>
                      Download Resources
                    </Button>
                  </div>
                </Card.Body>
              </Card>

              {/* Important Dates */}
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-white py-3">
                  <h5 className="mb-0 fw-bold text-info">
                    <i className="bi bi-calendar-event me-2"></i>
                    Important Dates
                  </h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 px-0">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-clock text-warning me-2"></i>
                        <span>Submission Deadline</span>
                      </div>
                      <Badge bg="warning" text="dark">{teamData.deadline}</Badge>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 px-0">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-megaphone text-success me-2"></i>
                        <span>Results Announcement</span>
                      </div>
                      <Badge bg="success">2025-04-20</Badge>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 px-0">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-people text-primary me-2"></i>
                        <span>Team Review</span>
                      </div>
                      <Badge bg="primary">Weekly</Badge>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Additional Sections */}
          <Row className="g-4 mt-2">
            {/* My Contributions */}
            <Col md={6}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Header className="bg-white py-3">
                  <h5 className="mb-0 fw-bold text-success">
                    <i className="bi bi-check-circle me-2"></i>
                    My Contributions
                  </h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    {myContributions.map((contribution, index) => (
                      <ListGroup.Item key={index} className="border-0 px-0">
                        <div className="d-flex align-items-start">
                          <i className="bi bi-check2 text-success mt-1 me-2"></i>
                          <span>{contribution}</span>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <div className="text-center mt-3">
                    <Button variant="outline-success" size="sm">
                      <i className="bi bi-plus-circle me-1"></i>
                      Add Contribution
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Recent Activities */}
            <Col md={6}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Header className="bg-white py-3">
                  <h5 className="mb-0 fw-bold text-info">
                    <i className="bi bi-activity me-2"></i>
                    Recent Activities
                  </h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    {recentActivities.map((activity, index) => (
                      <ListGroup.Item key={index} className="border-0 px-0">
                        <div className="d-flex align-items-start">
                          <i className="bi bi-circle-fill text-primary small mt-1 me-2"></i>
                          <div>
                            <span className="small">{activity}</span>
                            <br />
                            <small className="text-muted">2 hours ago</small>
                          </div>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <div className="text-center mt-3">
                    <Button variant="outline-primary" size="sm">
                      <i className="bi bi-clock-history me-1"></i>
                      View All Activities
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Performance Metrics */}
          <Row className="g-4 mt-2">
            <Col>
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-white py-3">
                  <h5 className="mb-0 fw-bold text-primary">
                    <i className="bi bi-graph-up me-2"></i>
                    Team Performance Overview
                  </h5>
                </Card.Header>
                <Card.Body>
                  <Row className="text-center">
                    <Col md={3}>
                      <div className="border-end">
                        <h3 className="text-success fw-bold">85%</h3>
                        <small className="text-muted">Content Quality</small>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="border-end">
                        <h3 className="text-warning fw-bold">78%</h3>
                        <small className="text-muted">Technical Depth</small>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="border-end">
                        <h3 className="text-info fw-bold">92%</h3>
                        <small className="text-muted">Creativity</small>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div>
                        <h3 className="text-primary fw-bold">88%</h3>
                        <small className="text-muted">Overall Score</small>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .min-vh-100 {
          min-height: 100vh;
        }
        .card {
          border-radius: 0.75rem;
        }
        .progress {
          border-radius: 0.5rem;
        }
      `}</style>
    </>
  );
};

export default TeamMemberDashboard;