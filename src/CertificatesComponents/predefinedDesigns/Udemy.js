import React from "react";
import { useSelector } from "react-redux";
import udemyLogo from "../../Assets/Images/udemy-logo.png";
import "../../Assets/Style/udemy.css";
const UdemyCertificateGenerator = () => {
  const { formData, certificateNumber } = useSelector((state) => state.udemy);

  return (
    <div className="container">
      <div id="Ude-certificate" style={{ backgroundColor: "#f8f9fb" }}>
        <div className="logo">
          <div className="udemy-logo">
            <img id="udemy-logo" src={udemyLogo} alt="Udemy Logo" />
          </div>
          <div className="right-side">
            <div className="c-no">Certificate no: {certificateNumber}</div>
            <div className="c-url">
              Certificate URL: ude.my/{certificateNumber}
            </div>
            <div className="ref-no">
              Reference Number: {formData.referenceNumber}
            </div>
          </div>
        </div>
        <div className="content">
          <h3>CERTIFICATE OF COMPLETION</h3>
          <h1 id="course-name">{formData.course.replace(/\n/g, "<br>")}</h1>
          <h4>
            {formData.instructor.includes(",") ? "Instructors" : "Instructor"}
            &nbsp;<b>{formData.instructor}</b>
          </h4>
        </div>
        <div className="user">
          <h1 id="name">
            {formData.firstName} {formData.lastName}
          </h1>
          <h4>
            Date &nbsp;<b>{formData.date}</b>
          </h4>
          <h4>
            Length &nbsp;<b>{formData.length} total hours</b>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default UdemyCertificateGenerator;
