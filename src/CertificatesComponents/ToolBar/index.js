import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import {
  updateElement,
  addElement,
  setBackground,
  togglePreview,
} from "../../Redux/actions";
import PreviewModal from "../Preview";

const Toolbar = () => {
  const dispatch = useDispatch();
  const activeElement = useSelector((state) => state.activeElement);
  const elements = useSelector((state) => state.elements);
  const background = useSelector((state) => state.background);
  const [showModal, setShowModal] = useState(false);
  const [qrCodeData, setQrCodeData] = useState("");

  const handleChange = (property, value) => {
    if (activeElement !== null) {
      dispatch(updateElement(activeElement, { [property]: value }));
    }
  };

  const addTextElement = () => {
    dispatch(
      addElement({
        type: "text",
        content: "New Text",
        fontFamily: "Arial",
        fontSize: 16,
        color: "#000",
        x: 50,
        y: 50,
      })
    );
  };

  const addBadgeElement = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        dispatch(
          addElement({
            type: "badge",
            src: reader.result,
            width: 100,
            height: 100,
            objectFit: "cover",
            x: 50,
            y: 50,
          })
        );
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleFileUpload = (type) => (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        dispatch(
          addElement({
            type,
            src: reader.result,
            width: "100%",
            height: "100%",
            x: 50,
            y: 50,
          })
        );
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        dispatch(setBackground(reader.result));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleTogglePreview = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_API_BASE_URL}/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ elements: elements, background: background }),
        }
      );
      console.log(response, "res");

      if (response.ok) {
        console.log("ok");
        const data = await response.json();

        const qrCodeData = data.certificateId;
        setQrCodeData(qrCodeData);

        setShowModal(true);
        dispatch(togglePreview());
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
    <div className="p-3">
      <h4>Tools</h4>
      <div className="mb-3">
        <Button onClick={addTextElement} className="mb-2" variant="primary">
          Add Text
        </Button>
        <Form.Group className="">
          <Form.Label>Add Badge</Form.Label>
          <Form.Control type="file" onChange={addBadgeElement} />
        </Form.Group>
        <Form.Group className="">
          <Form.Label>Add Logo</Form.Label>
          <Form.Control type="file" onChange={handleFileUpload("logo")} />
        </Form.Group>
        <Form.Group className="">
          <Form.Label>Add Signature</Form.Label>
          <Form.Control type="file" onChange={handleFileUpload("signature")} />
        </Form.Group>
      </div>

      {activeElement !== null && elements[activeElement]?.type === "text" && (
        <div className="text-tools mt-4">
          <Form.Group className="">
            <Form.Label>Text Style</Form.Label>
            <div className="d-flex">
              <Button
                onClick={() =>
                  handleChange(
                    "fontWeight",
                    elements[activeElement].fontWeight === "bold"
                      ? "normal"
                      : "bold"
                  )
                }
                variant={
                  elements[activeElement].fontWeight === "bold"
                    ? "primary"
                    : "light"
                }
                className="me-2"
              >
                <strong>B</strong>
              </Button>
              <Button
                onClick={() =>
                  handleChange(
                    "fontStyle",
                    elements[activeElement].fontStyle === "italic"
                      ? "normal"
                      : "italic"
                  )
                }
                variant={
                  elements[activeElement].fontStyle === "italic"
                    ? "primary"
                    : "light"
                }
                className="me-2"
              >
                <em>I</em>
              </Button>
              <Button
                onClick={() =>
                  handleChange(
                    "textDecoration",
                    elements[activeElement].textDecoration === "underline"
                      ? "none"
                      : "underline"
                  )
                }
                variant={
                  elements[activeElement].textDecoration === "underline"
                    ? "primary"
                    : "light"
                }
              >
                <u>U</u>
              </Button>
            </div>
          </Form.Group>
          <div className="d-flex">
            <Form.Group className="mb-3">
              <Form.Label>Font Family</Form.Label>
              <Form.Control
                as="select"
                value={elements[activeElement].fontFamily}
                onChange={(e) => handleChange("fontFamily", e.target.value)}
              >
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Verdana">Verdana</option>
                <option value="Georgia">Georgia</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label> Size</Form.Label>
              <Form.Control
                type="number"
                value={elements[activeElement].fontSize}
                onChange={(e) => handleChange("fontSize", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> Color</Form.Label>
              <Form.Control
                type="color"
                value={elements[activeElement].color}
                onChange={(e) => handleChange("color", e.target.value)}
              />
            </Form.Group>
          </div>
        </div>
      )}

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Background Image</Form.Label>
          <Form.Control type="file" onChange={handleBackgroundChange} />
        </Form.Group>

        <Button onClick={handleTogglePreview} variant="info">
          Save & Preview
        </Button>
      </Form>

      <PreviewModal
        show={showModal}
        handleClose={handleCloseModal}
        qrCodeData={qrCodeData}
      />
    </div>
  );
};

export default Toolbar;
