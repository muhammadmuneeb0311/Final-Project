import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
   

      {/*  Hero Section */}
      <section className="bg-primary text-white py-5">
        <Container>
          <div className="text-center py-5">
            <h1 className="display-4 fw-bold mb-4">
            Contact Us
            </h1>
            <p className="lead mb-4">
             Have any questions? We'd love to hear from you.
            </p>
         
          </div>
        </Container>
      </section>

      {/*  Contact Section */}
      <Container className="my-5">
    

        <Row>
          {/* Contact Form */}
          <Col md={7}>
            <Card className="p-4 shadow-sm">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="subject" className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="message" className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    placeholder="Type your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100">
                  Send Message
                </Button>
              </Form>
            </Card>
          </Col>

          {/* Contact Information */}
          <Col md={5} className="mt-4 mt-md-0">
            <Card className="p-4 shadow-sm">
              <h5>Contact Information</h5>
              <p>
                <strong>Address:</strong> University Road, Multan, Pakistan
              </p>
              <p>
                <strong>Phone:</strong> +92 300 1234567
              </p>
              <p>
                <strong>Email:</strong> support@competition.com
              </p>
              <div className="ratio ratio-16x9">
                <iframe
                  src="https://maps.google.com/maps?q=Multan&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  title="map"
                  style={{ border: 0 }}
                  allowFullScreen
                ></iframe>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contact;
