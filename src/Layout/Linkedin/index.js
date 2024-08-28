import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import html2pdf from "html2pdf.js";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import QRCode from "qrcode.react";
import CertificateGenerator from "../../CertificatesComponents/predefinedDesigns/linkedin";
import {
  generateCertificateId,
  setLinkedInFormData,
  toggleLinkedInPreview,
} from "../../Redux/actions";
import "../../Assets/Style/linkedin.css";

const LinkedInCertificate = () => {
  const dispatch = useDispatch();
  const { formData } = useSelector((state) => state.linkedinCertificate);
  const [showModal, setShowModal] = useState(false);
  const [qrCodeData, setQrCodeData] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.date) newErrors.date = "Completion Date is required";
    if (!formData.courseLength)
      newErrors.courseLength = "Course Length is required";
    if (!formData.courseName) newErrors.courseName = "Course Name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setLinkedInFormData({ ...formData, [name]: value }));
  };

  const handleDownload = () => {
    const element = document.getElementById("certificate");
    const opt = {
      margin: 1,
      filename: "LinkedIn-certificate.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "px", format: "a2", orientation: "landscape" },
    };
    html2pdf().set(opt).from(element).save();
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(
        `${process.env.REACT_API_BASE_URL}/generate-linkedin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ elements: formData }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const qrCodeData = data.certificateId;
        setQrCodeData(qrCodeData);

        setShowModal(true);
        dispatch(generateCertificateId());
        dispatch(toggleLinkedInPreview());
      } else {
        console.error("Failed to save design.");
      }
    } catch (error) {
      console.error("Error calling save API:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3} className="bg-light p-4">
          <Form id="form" onSubmit={handleGenerate}>
            <Form.Group className="mb-1">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                id="fname"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-1">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                id="lname"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-1">
              <Form.Label>Completion Date</Form.Label>
              <Form.Control
                type="date"
                id="date"
                name="date"
                placeholder="Completion Date"
                value={formData.date}
                onChange={handleInputChange}
                isInvalid={!!errors.date}
              />
              <Form.Control.Feedback type="invalid">
                {errors.date}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-1">
              <Form.Label>Course Length</Form.Label>
              <Form.Control
                as="select"
                id="length"
                name="courseLength"
                value={formData.courseLength}
                onChange={handleInputChange}
                isInvalid={!!errors.courseLength}
              >
                <option value="">Select Course Length</option>
                <option value="1 month">1 month</option>
                <option value="3 months">3 months</option>
                <option value="6 months">6 months</option>
                <option value="1 year">1 year</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.courseLength}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-1">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                as="select"
                id="course"
                name="courseName"
                value={formData.courseName}
                onChange={handleInputChange}
                isInvalid={!!errors.courseName}
              >
                <option value="">Select Course Name</option>
                <option value="Advanced React">Advanced React</option>
                <option value="Introduction to Node.js">
                  Introduction to Node.js
                </option>
                <option value="Data Science with Python">
                  Data Science with Python
                </option>
                <option value="UX/UI Design">UX/UI Design</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.courseName}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Generate Certificate
            </Button>
          </Form>

          <Button
            variant="success"
            onClick={handleDownload}
            id="download"
            className="w-100 mt-3"
          >
            Download PDF
          </Button>
        </Col>
        <Col md={9}>
          <CertificateGenerator />
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Certificate Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            id="certificate"
            style={{
              position: "relative",
              width: "100%",
              height: "auto",
              border: "1px solid #ddd",
              overflow: "hidden",
            }}
          >
            <CertificateGenerator />
            {qrCodeData && (
              <div
                style={{
                  position: "absolute",
                  bottom: 20,
                  right: 40,
                }}
              >
                <QRCode
                  value={`${window.location.origin}/verify/${qrCodeData}`}
                  size={100}
                />
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDownload}>
            Download as PDF
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default LinkedInCertificate;
