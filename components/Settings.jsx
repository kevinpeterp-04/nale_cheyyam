import React from "react";

const Settings = ({ chaosLevel, setChaosLevel }) => {
  const chaosLevels = [
    { value: 1, label: "Low Chaos", description: "Mildly annoying" },
    { value: 2, label: "Medium Chaos", description: "Pretty chaotic" },
    { value: 3, label: "High Chaos", description: "Total mayhem" },
  ];

  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2>Chaos Settings</h2>
      <p style={{ marginBottom: "15px", color: "#666" }}>
        Adjust how much ProcrastinApp messes with your tasks
      </p>

      <div style={{ marginBottom: "15px" }}>
        <label
          style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}
        >
          Chaos Level:
        </label>
        {chaosLevels.map((level) => (
          <div key={level.value} style={{ marginBottom: "10px" }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                value={level.value}
                checked={chaosLevel === level.value}
                onChange={(e) => setChaosLevel(Number(e.target.value))}
                style={{ marginRight: "10px" }}
              />
              <div>
                <div style={{ fontWeight: "bold" }}>{level.label}</div>
                <div style={{ fontSize: "0.9rem", color: "#666" }}>
                  {level.description}
                </div>
              </div>
            </label>
          </div>
        ))}
      </div>

      <div
        style={{
          backgroundColor: "#fff9fc",
          padding: "15px",
          borderRadius: "10px",
          border: "2px dashed #ff6699",
          fontSize: "0.9rem",
          color: "#666",
        }}
      >
        <strong>Note:</strong> Higher chaos levels increase the chance of tasks
        being renamed, extended, or deleted automatically.
      </div>
    </div>
  );
};

export default Settings;
