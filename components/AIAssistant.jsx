import React, { useState } from "react";
import { getRandomQuote } from "../utils/quotes";

const AIAssistant = () => {
  const [advice, setAdvice] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const handleGetAdvice = () => {
    setIsThinking(true);

    // Simulate AI "thinking"
    setTimeout(() => {
      setAdvice(getRandomQuote());
      setIsThinking(false);
    }, 1500);
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
      <h2>AI Procrastination Assistant</h2>
      <p style={{ marginBottom: "15px", color: "#666" }}>
        Get "helpful" advice from our advanced AI
      </p>

      <button
        onClick={handleGetAdvice}
        disabled={isThinking}
        style={{
          backgroundColor: "#9966ff",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: "10px",
          fontSize: "1rem",
          cursor: "pointer",
          marginBottom: "15px",
          opacity: isThinking ? 0.7 : 1,
        }}
      >
        {isThinking ? "Thinking..." : 'Get "Helpful" Advice'}
      </button>

      {advice && (
        <div
          style={{
            backgroundColor: "#fff9fc",
            padding: "15px",
            borderRadius: "10px",
            border: "2px dashed #9966ff",
            fontStyle: "italic",
            fontSize: "1.1rem",
          }}
        >
          "{advice}"
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
