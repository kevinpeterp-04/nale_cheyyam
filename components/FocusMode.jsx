import React from "react";
import { getRandomDistraction } from "../utils/chaos";

const FocusMode = ({ focusClicks, setFocusClicks }) => {
  const handleFocusMode = () => {
    setFocusClicks((prev) => prev + 1);

    const randomDistraction = getRandomDistraction();
    window.open(randomDistraction, "_blank");

    alert("Time to focus... on memes! 😂");
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      <h2>Focus Mode</h2>
      <p style={{ marginBottom: "15px", color: "#666" }}>
        Click to enter deep focus state (just kidding)
      </p>
      <button
        onClick={handleFocusMode}
        style={{
          backgroundColor: "#33cc33",
          color: "white",
          border: "none",
          padding: "15px 25px",
          borderRadius: "10px",
          fontSize: "1.2rem",
          cursor: "pointer",
        }}
      >
        Focus Mode (Just Kidding)
      </button>
      <p style={{ marginTop: "10px", fontSize: "0.9rem", color: "#888" }}>
        Times clicked: {focusClicks}
      </p>
    </div>
  );
};

export default FocusMode;
