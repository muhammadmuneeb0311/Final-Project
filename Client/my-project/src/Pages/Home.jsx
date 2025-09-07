import { Link } from 'react-router-dom';
import { Button,Container } from 'react-bootstrap';
  import HomeHeader from "../Components/HomeHeader";

const Home = () => {
  return (
    <>
   


      {/* Reusable Navbar */}
      <HomeHeader />

      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <Container>
          <div className="text-center py-5">
            <h1 className="display-4 fw-bold mb-4">
              Automated Content Evaluation System
            </h1>
            <p className="lead mb-4">
              Submit, evaluate, and track your content submissions with our advanced platform
            </p>
            <Button as={Link} to="/register" variant="light" size="lg" className="me-3">
              Get Started
            </Button>
            <Button as={Link} to="/about" variant="outline-light" size="lg">
              Learn More
            </Button>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold">How It Works</h2>
            <p className="text-muted">Simple steps to get your content evaluated</p>
          </div>
          
          <div className="row">
            <div className="col-md-4 text-center mb-4">
              <div className="bg-light p-4 rounded">
                <h3>1. Register</h3>
                <p>Create your account as a participant or evaluator</p>
              </div>
            </div>
            
            <div className="col-md-4 text-center mb-4">
              <div className="bg-light p-4 rounded">
                <h3>2. Submit</h3>
                <p>Upload your video content and related information</p>
              </div>
            </div>
            
            <div className="col-md-4 text-center mb-4">
              <div className="bg-light p-4 rounded">
                <h3>3. Evaluate</h3>
                <p>Get evaluated by professional reviewers</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-light py-4">
        <Container>
          <div className="text-center">
            <p>&copy; 2024 Content Evaluation System. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Home;