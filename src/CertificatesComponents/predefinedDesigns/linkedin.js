import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Image } from "react-bootstrap";
import linkedinLeft from "../../Assets/Images/LinkedIn left-2.png";
import Learning from "../../Assets/Images/Learning.png";
import Sign2 from "../../Assets/Images/Sign2.JPG";

const CertificateGenerator = () => {
  const { formData, certificateId } = useSelector(
    (state) => state.linkedinCertificate
  );

  return (
    <Container className="" id="certificate">
      <div className="outer">
        <div className="light-br">
          <div className="dark-br">
            <div className="main-content">
              <Row>
                <Col md={4} className="left-side">
                  <Image src={linkedinLeft} alt="LinkedIn Left" />
                </Col>
                <Col md={8} className="right-content">
                  <div className="logo mb-4">
                    <Image src={Learning} alt="LinkedIn Learning" fluid />
                  </div>
                  <div className="congrats mb-4">
                    <h2 className="text-primary">Certificate of Completion</h2>
                    <h3>
                      Congratulations, {formData.firstName} {formData.lastName}
                    </h3>
                  </div>
                  <div className="course-name mb-4">
                    <h1>{formData.courseName}</h1>
                    <div className="completion mt-3">
                      <h3>Course completed on {formData.date}</h3>
                      <h3 id="clength">•&nbsp;&nbsp;{formData.courseLength}</h3>
                    </div>
                  </div>
                  <div className="para mb-4">
                    <h2>
                      By continuing to learn, you have expanded your
                      perspective, sharpened your skills, and made yourself even
                      more in demand.
                    </h2>
                  </div>
                  <div className="authority d-flex">
                    <div className="part-1 mr-4">
                      <Image id="sign" src={Sign2} alt="Signature" fluid />
                      <h3>VP, Learning Content at LinkedIn</h3>
                    </div>
                    <div className="vl"></div>
                    <div className="part-2">
                      <h3>LinkedIn Learning</h3>
                      <h3>1000 W Maude Ave</h3>
                      <h3>Sunnyvale, CA 94085</h3>
                    </div>
                  </div>
                  <div className="certificate-id mt-4">
                    Certificate Id: {certificateId}
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CertificateGenerator;
