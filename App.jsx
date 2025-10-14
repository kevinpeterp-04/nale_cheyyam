import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import FocusMode from "./components/FocusMode";
import Analytics from "./components/Analytics";
import AIAssistant from "./components/AIAssistant";
import Certificate from "./components/Certificate";
import Settings from "./components/Settings";
import { getRandomQuote } from "./utils/quotes";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [focusClicks, setFocusClicks] = useState(0);
  const [chaosLevel, setChaosLevel] = useState(2);
  const [showCertificate, setShowCertificate] = useState(false);
  const [currentQuote, setCurrentQuote] = useState("");

  useEffect(() => {
    // Set initial quote
    setCurrentQuote(getRandomQuote());

    // Change quote every 15 seconds
    const quoteInterval = setInterval(() => {
      setCurrentQuote(getRandomQuote());
    }, 15000);

    return () => clearInterval(quoteInterval);
  }, []);

  return (
    <div className="container">
      <Navbar />

      <div
        style={{
          textAlign: "center",
          fontStyle: "italic",
          margin: "20px 0",
          color: "#666",
          fontSize: "1.1rem",
        }}
      >
        "{currentQuote}"
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <TaskList tasks={tasks} setTasks={setTasks} chaosLevel={chaosLevel} />
          <FocusMode
            focusClicks={focusClicks}
            setFocusClicks={setFocusClicks}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Analytics tasks={tasks} focusClicks={focusClicks} />
          <AIAssistant />
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <button
              onClick={() => setShowCertificate(true)}
              style={{
                backgroundColor: "#ffcc00",
                color: "white",
                border: "none",
                padding: "12px 20px",
                borderRadius: "10px",
                fontSize: "1rem",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Generate Procrastination Certificate
            </button>
          </div>
          <Settings chaosLevel={chaosLevel} setChaosLevel={setChaosLevel} />
        </div>
      </div>

      <Certificate
        tasks={tasks}
        isVisible={showCertificate}
        onClose={() => setShowCertificate(false)}
      />

      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "20px",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p>
          Remember: Tomorrow is the new today. Procrastinate responsibly! 😎
        </p>
      </div>
    </div>
  );
};

export default App;
