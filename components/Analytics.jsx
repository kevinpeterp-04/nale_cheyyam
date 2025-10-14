import React, { useState, useEffect } from "react";

const Analytics = ({ tasks, focusClicks }) => {
  const [timeWasted, setTimeWasted] = useState(0);
  const [procrastinationLevel, setProcrastinationLevel] = useState(0);

  useEffect(() => {
    // Update stats periodically
    const interval = setInterval(() => {
      setTimeWasted((prev) => prev + Math.floor(Math.random() * 5));
      setProcrastinationLevel(Math.floor(Math.random() * 40 + 60));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const tasksIgnored = tasks.filter((task) => task.deleted).length;

  const stats = [
    { label: "Tasks Ignored", value: tasksIgnored, color: "#ff3366" },
    {
      label: "Procrastination Level",
      value: `${procrastinationLevel}%`,
      color: "#ff6699",
    },
    { label: "Time Wasted", value: `${timeWasted} mins`, color: "#ffcc00" },
    { label: '"Focus" Clicks', value: focusClicks, color: "#33cc33" },
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
      <h2>Procrastination Analytics</h2>
      <p style={{ marginBottom: "15px", color: "#666" }}>
        Important-looking numbers that mean nothing
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px",
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#fff9fc",
              padding: "15px",
              borderRadius: "10px",
              textAlign: "center",
              border: `2px dashed ${stat.color}`,
            }}
          >
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: stat.color,
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontSize: "0.9rem",
                color: "#666",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
