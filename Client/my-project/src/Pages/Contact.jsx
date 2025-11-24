import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Badge, Alert } from "react-bootstrap";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setShowAlert(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    
    // Hide alert after 5 seconds
    setTimeout(() => setShowAlert(false), 5000);
  };

  const contactMethods = [
    {
      icon: "bi-geo-alt-fill",
      title: "Our Location",
      details: "University Road, Multan, Pakistan",
      description: "Visit our campus headquarters"
    },
    {
      icon: "bi-telephone-fill",
      title: "Phone Number",
      details: "+92 300 1234567",
      description: "Mon to Fri 9am to 6pm"
    },
    {
      icon: "bi-envelope-fill",
      title: "Email Address",
      details: "support@competition.com",
      description: "Send us your query anytime"
    },
    {
      icon: "bi-clock-fill",
      title: "Working Hours",
      details: "9:00 AM - 6:00 PM",
      description: "Monday to Friday"
    }
  ];

  return (
    <>
      {/* Bootstrap Icons */}
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" 
        rel="stylesheet" 
      />

      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-5">
        <Container>
          <Row className="text-center py-5">
            <Col lg={8} className="mx-auto">
              <Badge bg="light" text="primary" className="mb-3 fs-6 px-3 py-2">
                <i className="bi bi-chat-dots me-2"></i>
                Get In Touch
              </Badge>
              <h1 className="display-4 fw-bold mb-4">
                Contact Us
              </h1>
              <p className="lead mb-4 fs-5">
                Have questions? We're here to help. Send us a message and we'll respond as soon as possible.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-2">
                <Badge bg="white" text="primary" className="fs-6 px-3 py-2">
                  <i className="bi bi-check-circle me-2"></i>
                  24/7 Support
                </Badge>
                <Badge bg="white" text="primary" className="fs-6 px-3 py-2">
                  <i className="bi bi-check-circle me-2"></i>
                  Quick Response
                </Badge>
                <Badge bg="white" text="primary" className="fs-6 px-3 py-2">
                  <i className="bi bi-check-circle me-2"></i>
                  Expert Help
                </Badge>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Methods */}
      <section className="py-4 bg-light">
        <Container>
          <Row className="g-4">
            {contactMethods.map((method, index) => (
              <Col key={index} xs={6} lg={3}>
                <Card className="border-0 shadow-sm h-100 text-center">
                  <Card.Body className="p-4">
                    <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                         style={{width: '60px', height: '60px'}}>
                      <i className={`${method.icon} text-primary fs-4`}></i>
                    </div>
                    <h6 className="fw-bold mb-2">{method.title}</h6>
                    <p className="text-primary fw-semibold mb-1">{method.details}</p>
                    <small className="text-muted">{method.description}</small>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Contact Form & Information */}
      <Container className="my-5">
        <Row className="g-5">
          {/* Contact Form */}
          <Col lg={8}>
            <Card className="border-0 shadow-lg">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h3 className="fw-bold text-primary mb-2">
                    <i className="bi bi-send-fill me-2"></i>
                    Send Us a Message
                  </h3>
                  <p className="text-muted">Fill out the form below and we'll get back to you shortly</p>
                </div>

                {showAlert && (
                  <Alert variant="success" className="d-flex align-items-center">
                    <i className="bi bi-check-circle-fill me-2 fs-5"></i>
                    <div>
                      <strong>Message sent successfully!</strong> We'll get back to you within 24 hours.
                    </div>
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">
                          <i className="bi bi-person me-2"></i>
                          Full Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          size="lg"
                          className="border-2 py-3"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">
                          <i className="bi bi-envelope me-2"></i>
                          Email Address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          size="lg"
                          className="border-2 py-3"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">
                      <i className="bi bi-chat-square-text me-2"></i>
                      Subject
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      placeholder="What is this regarding?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      size="lg"
                      className="border-2 py-3"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">
                      <i className="bi bi-pencil-square me-2"></i>
                      Message
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      name="message"
                      placeholder="Please describe your inquiry in detail..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="border-2"
                      style={{resize: 'none'}}
                    />
                  </Form.Group>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    className="w-100 py-3 fw-semibold fs-5"
                  >
                    <i className="bi bi-send-check me-2"></i>
                    Send Message
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Information & Map */}
          <Col lg={4}>
            <Card className="border-0 shadow-lg h-100">
              <Card.Body className="p-4">
                <h4 className="fw-bold text-primary mb-4">
                  <i className="bi bi-info-circle me-2"></i>
                  Contact Information
                </h4>

                <div className="mb-4">
                  {contactMethods.slice(0, 3).map((method, index) => (
                    <div key={index} className="d-flex align-items-start mb-3">
                      <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3 mt-1">
                        <i className={`${method.icon} text-primary`}></i>
                      </div>
                      <div>
                        <h6 className="fw-semibold mb-1">{method.title}</h6>
                        <p className="text-muted mb-0">{method.details}</p>
                        <small className="text-muted">{method.description}</small>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <h6 className="fw-semibold mb-3">
                    <i className="bi bi-clock me-2"></i>
                    Office Hours
                  </h6>
                  <div className="bg-light rounded p-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Monday - Friday</span>
                      <strong>9:00 AM - 6:00 PM</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Saturday</span>
                      <strong>10:00 AM - 2:00 PM</strong>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Sunday</span>
                      <strong className="text-danger">Closed</strong>
                    </div>
                  </div>
                </div>

                <div>
                  <h6 className="fw-semibold mb-3">
                    <i className="bi bi-geo-alt me-2"></i>
                    Our Location
                  </h6>
                  <div className="ratio ratio-16x9 rounded overflow-hidden shadow-sm">
                    <iframe
                      src="https://maps.google.com/maps?q=Virtual%20University%20Multan&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      title="Virtual University Multan Campus"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* FAQ Section */}
      <section className="bg-light py-5">
        <Container>
          <Row className="text-center mb-4">
            <Col lg={8} className="mx-auto">
              <h3 className="fw-bold mb-3">Frequently Asked Questions</h3>
              <p className="text-muted">Quick answers to common questions</p>
            </Col>
          </Row>
          <Row className="g-4">
            {[
              {
                question: "How long does it take to get a response?",
                answer: "We typically respond within 24 hours during business days."
              },
              {
                question: "Do you provide technical support?",
                answer: "Yes, we offer comprehensive technical support for all platform users."
              },
              {
                question: "Can I visit your office?",
                answer: "Absolutely! We welcome visitors during our office hours."
              },
              {
                question: "Do you support team collaborations?",
                answer: "Yes, we have dedicated features for team-based projects and submissions."
              }
            ].map((faq, index) => (
              <Col key={index} md={6}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="p-4">
                    <h6 className="fw-bold text-primary mb-3">
                      <i className="bi bi-question-circle me-2"></i>
                      {faq.question}
                    </h6>
                    <p className="text-muted mb-0">{faq.answer}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        .bg-gradient-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        }
        .border-2 {
          border-width: 2px !important;
        }
      `}</style>
    </>
  );
};

export default Contact;