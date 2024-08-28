import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Rnd } from "react-rnd";
import {
  setActiveElement,
  removeElement,
  updateElement,
} from "../../Redux/actions";
import { Dropdown } from "react-bootstrap";

const Canvas = () => {
  const elements = useSelector((state) => state.elements);
  const background = useSelector((state) => state.background);
  const activeElement = useSelector((state) => state.activeElement);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState("");
  const canvasRef = useRef(null);

  const handleElementClick = (index) => {
    dispatch(setActiveElement(index));
    setIsEditing(index);
    setEditText(elements[index].content || "");
  };

  const handleTextChange = (e) => {
    setEditText(e.target.value);
    dispatch(updateElement(isEditing, { content: e.target.value }));
  };

  const handleBlur = () => {
    setIsEditing(null);
  };

  const handleEditClick = (index) => {
    setIsEditing(index);
    setEditText(elements[index].content || "");
    handleElementClick(index);
  };

  const bringToFront = () => {
    const maxZIndex = Math.max(...elements.map((el) => el.zIndex || 1));
    dispatch(updateElement(activeElement, { zIndex: maxZIndex + 1 }));
  };

  const sendToBack = () => {
    const minZIndex = Math.min(...elements.map((el) => el.zIndex || 1));
    dispatch(updateElement(activeElement, { zIndex: minZIndex - 1 }));
  };

  const moveForward = () => {
    const currentZIndex = elements[activeElement].zIndex || 1;
    dispatch(updateElement(activeElement, { zIndex: currentZIndex + 1 }));
  };

  const moveBackward = () => {
    const currentZIndex = elements[activeElement].zIndex || 1;
    dispatch(updateElement(activeElement, { zIndex: currentZIndex - 1 }));
  };

  const handleClickOutside = (e) => {
    if (
      canvasRef.current &&
      !canvasRef.current.contains(e.target) &&
      isEditing !== null
    ) {
      setIsEditing(null);
      dispatch(setActiveElement(null));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  useEffect(() => {
    dispatch(setActiveElement(null));
  }, [dispatch]);

  return (
    <div className="p-3" ref={canvasRef}>
      <h4>Certificate Canvas</h4>
      <div
        id="certificate-canvas"
        style={{
          position: "relative",
          width: "100%",
          height: "664px",

          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          border: "1px solid #ddd",
          overflow: "hidden",
        }}
      >
        {elements &&
          elements.length > 0 &&
          elements.map((element, index) => (
            <Rnd
              key={index}
              size={{
                width: element.width || "auto",
                height: element.height || "auto",
              }}
              position={{ x: element.x, y: element.y }}
              onDrag={(e, d) =>
                dispatch(updateElement(index, { x: d.x, y: d.y }))
              }
              onResizeStop={(e, direction, ref, delta, position) =>
                dispatch(
                  updateElement(index, {
                    width: ref.style.width,
                    height: ref.style.height,
                    ...position,
                  })
                )
              }
              onClick={() => handleElementClick(index)}
              bounds="parent"
              style={{
                zIndex: element.zIndex || 1,
                border:
                  activeElement === index ? "2px solid blue" : "1px solid #ddd",
                padding: element.type === "text" ? "5px" : 0,
                fontSize: `${element.fontSize}px`,
                fontFamily: element.fontFamily,
                fontWeight: element.fontWeight || "normal",
                fontStyle: element.fontStyle || "normal",
                textDecoration: element.textDecoration || "none",
                color: element.color,
              }}
            >
              {element.type === "text" ? (
                isEditing === index ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={handleTextChange}
                    onBlur={handleBlur}
                    autoFocus
                    className="form-control"
                    style={{
                      fontSize: `${element.fontSize}px`,
                      fontFamily: element.fontFamily,
                      fontWeight: element.fontWeight || "normal",
                      fontStyle: element.fontStyle || "normal",
                      textDecoration: element.textDecoration || "none",
                      color: element.color,
                    }}
                  />
                ) : (
                  <p onDoubleClick={() => handleElementClick(index)}>
                    {element.content}
                  </p>
                )
              ) : element.type === "badge" ||
                element.type === "logo" ||
                element.type === "signature" ? (
                <img
                  src={element.src}
                  alt={element.type}
                  style={{
                    width: element.width,
                    height: element.height,
                    objectFit: "cover",
                  }}
                />
              ) : null}
              {activeElement === index && (
                <div className="d-flex justify-content-around py-2">
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="secondary"
                      id="dropdown-basic"
                      className="btn-sm"
                    >
                      Position
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={moveForward}>Fwd</Dropdown.Item>
                      <Dropdown.Item onClick={moveBackward}>Bwd</Dropdown.Item>
                      <Dropdown.Item onClick={bringToFront}>Top</Dropdown.Item>
                      <Dropdown.Item onClick={sendToBack}>Bot</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <div className="d-flex align-item-center">
                    <button
                      onClick={() => handleEditClick(index)}
                      className="btn btn-primary btn-sm mt-0"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      onClick={() => dispatch(removeElement(index))}
                      className="btn btn-danger btn-sm mt-0"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              )}
            </Rnd>
          ))}
      </div>
    </div>
  );
};

export default Canvas;
