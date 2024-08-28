import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Verify = () => {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);
  const background = useSelector((state) => state.background);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_API_BASE_URL}/design/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setCertificate(data);
        } else {
          console.error("Failed to fetch certificate data");
        }
      } catch (error) {
        console.error("Error fetching certificate data:", error);
      }
    };

    fetchCertificate();
  }, [id]);

  if (!certificate) return <div>Loading...</div>;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
      }}
    >
      <h1>Certificate Verification</h1>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "500px",
          backgroundImage: `url(${certificate.background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          border: "1px solid #ddd",
          overflow: "hidden",
        }}
      >
        {certificate.elements.map((element, index) => (
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
      </div>
    </div>
  );
};

export default Verify;
