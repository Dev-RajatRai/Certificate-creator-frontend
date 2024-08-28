import React from "react";
import Toolbar from "../../CertificatesComponents/ToolBar";
import Canvas from "../../CertificatesComponents/Canvas";
import { Container, Row, Col } from "react-bootstrap";

function CustomDesign() {
  return (
    <Container fluid className="p-4">
      <Row>
        <Col md={3} className="bg-light p-3 border">
          <Toolbar />
        </Col>
        <Col md={9} className="p-3">
          <Canvas />
        </Col>
      </Row>
    </Container>
  );
}

export default CustomDesign;
