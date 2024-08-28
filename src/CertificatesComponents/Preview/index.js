import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import QRCode from "qrcode.react";
import jsPDF from "jspdf";

const PreviewModal = ({ show, handleClose, qrCodeData }) => {
  const background = useSelector((state) => state.background);
  const elements = useSelector((state) => state.elements);

  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [1000, 700],
    });

    doc.html(document.querySelector("#preview-canvas"), {
      callback: function (pdf) {
        pdf.save("certificate-preview.pdf");
      },
    });
  };

  const currentUrl = window.location.origin;

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Certificate Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          id="preview-canvas"
          style={{
            position: "relative",
            width: "100%",
            height: "500px",
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "1px solid #ddd",
            overflow: "hidden",
          }}
        >
          {elements.map((element, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                top: element.y,
                left: element.x,
                fontSize: `${element.fontSize}px`,
                fontFamily: element.fontFamily,
                color: element.color,
                transform: `rotate(${element.rotation || 0}deg)`,
                fontWeight: element.fontWeight || "normal",
                fontStyle: element.fontStyle || "normal",
                textDecoration: element.textDecoration || "none",
              }}
            >
              {element.type === "text" ? (
                <p>{element.content}</p>
              ) : element.type === "badge" ||
                element.type === "logo" ||
                element.type === "signature" ? (
                <img
                  src={element.src}
                  alt={element.type}
                  style={{
                    width: element.width,
                    height: element.height,
                  }}
                />
              ) : null}
            </div>
          ))}
          {qrCodeData && (
            <div
              style={{
                position: "absolute",
                bottom: 20,
                right: 10,
              }}
            >
              <QRCode value={`${currentUrl}/verify/${qrCodeData}`} size={100} />
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDownloadPDF}>
          Download as PDF
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PreviewModal;
