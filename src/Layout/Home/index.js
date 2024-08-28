import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Form } from "react-bootstrap";

function Home() {
  const navigate = useNavigate();

  const handlePredefinedDesign = (event) => {
    const selectedDesign = event.target.value;
    if (selectedDesign) {
      navigate(`/certificate/${selectedDesign}`);
    }
  };

  return (
    <Container className="py-2">
      <Row className="justify-content-center text-center">
        <Col md={8}>
          <h1 className="mb-4">Welcome to Certificate Generator</h1>
          <div className="mb-4 d-flex justify-content-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/custom-design")}
            >
              Create Your Design
            </Button>
          </div>
          <Form>
            <Form.Group controlId="predefined-designs">
              <Form.Label className="h5">Predefined Designs</Form.Label>
              <Form.Control
                as="select"
                onChange={handlePredefinedDesign}
                custom
              >
                <option value="">Select a Design</option>
                <option value="linkedin">LinkedIn Certificate</option>
                <option value="udemy">Udemy Certificate</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
