
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HomeHeader from '../Components/HomeHeader';

const About = () => {
  return (
    <>
    
          {/* Reusable Navbar */}
          <HomeHeader />
    
 

      {/* Hero Section */}
      <div className="bg-primary text-white py-5">
        <Container>
          <Row className="text-center py-5">
            <Col>
              <h1 className="display-4 fw-bold mb-4">About Our Platform</h1>
              <p className="lead mb-4">
                Revolutionizing content evaluation through automation and innovation
              </p>
              <Button 
                as={Link} 
                to="/contact" 
                variant="light" 
                size="lg"
                className="me-3"
              >
                Contact Us
              </Button>
              <Button 
                as={Link} 
                to="/register" 
                variant="outline-light" 
                size="lg"
              >
                Get Started
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Mission Section */}
      <Container className="py-5">
        <Row className="align-items-center">
          <Col md={6}>
            <h2 className="fw-bold mb-4">Our Mission</h2>
            <p className="text-muted lead">
              To provide a seamless, automated platform for content submission and evaluation, 
              making the process efficient, transparent, and accessible for all participants 
              in educational and competitive environments.
            </p>
            <Button variant="primary" size="lg" className="mt-3">
              Learn More
            </Button>
          </Col>
          
        </Row>
      </Container>

      {/* Features Section */}
      <div className="bg-light py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold">Key Features</h2>
              <p className="text-muted">What makes our platform stand out</p>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                       style={{width: '60px', height: '60px'}}>
                    <span className="text-white fs-3">⚡</span>
                  </div>
                  <Card.Title>Automated Evaluation</Card.Title>
                  <Card.Text>
                    Streamlined scoring system with predefined criteria and real-time feedback
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="bg-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                       style={{width: '60px', height: '60px'}}>
                    <span className="text-white fs-3">👥</span>
                  </div>
                  <Card.Title>Team Collaboration</Card.Title>
                  <Card.Text>
                    Support for team-based submissions with up to 5 members per team
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="text-center p-4">
                  <div className="bg-info rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                       style={{width: '60px', height: '60px'}}>
                    <span className="text-white fs-3">📊</span>
                  </div>
                  <Card.Title>Real-time Analytics</Card.Title>
                  <Card.Text>
                    Live leaderboard and progress tracking with detailed performance metrics
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Technology Stack */}
      <Container className="py-5">
        <Row className="text-center mb-5">
          <Col>
            <h2 className="fw-bold">Technology Stack</h2>
            <p className="text-muted">Built with modern technologies</p>
          </Col>
        </Row>
        <Row className="text-center">
          {['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Bootstrap', 'JWT'].map((tech, index) => (
            <Col key={index} xs={6} md={2} className="mb-3">
              <Badge bg="secondary" className="fs-6 p-3 w-100">
                {tech}
              </Badge>
            </Col>
          ))}
        </Row>
      </Container>

      {/* CTA Section */}
      <div className="bg-primary text-white py-5">
        <Container>
          <Row className="text-center">
            <Col>
              <h3 className="fw-bold mb-4">Ready to Get Started?</h3>
              <p className="lead mb-4">Join hundreds of users who trust our platform</p>
              <Button 
                as={Link} 
                to="/register" 
                variant="light" 
                size="lg"
                className="me-3"
              >
                Register Now
              </Button>
              <Button 
                as={Link} 
                to="/login" 
                variant="outline-light" 
                size="lg"
              >
                Login
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default About;