import React, { useState, useEffect } from "react";

function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress < 100) {
      const timer = setInterval(() => {
        setProgress((prev) => prev + 10);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [progress]);

  return (
    <div>
      <div style={{ width: "100%", backgroundColor: "black" }}>
        <div
          style={{
            width: `${progress}%`,
            height: "24px",
            backgroundColor: "green",
            transition: "width 1s",
          }}
        ></div>
      </div>
      <p>Progress: {progress}%</p>
      <button onClick={() => setProgress(0)}>Click</button>
      <p>Loading...</p>
    </div>
  );
}

export default ProgressBar;
