// src/Components/HomeHeader.jsx
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const HomeHeader = () => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          Content Evaluation System
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="mx-2">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="mx-2">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="mx-2">
              Contact
            </Nav.Link>
          </Nav>

          <Nav>
            <Button
              as={Link}
              to="/register"
              variant="outline-primary"
              className="mx-2"
            >
              Register
            </Button>
            <Button
              as={Link}
              to="/login"
              variant="primary"
              className="mx-2"
            >
              Login
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HomeHeader;
