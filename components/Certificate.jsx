import React from "react";

const Certificate = ({ tasks, isVisible, onClose }) => {
  if (!isVisible) return null;

  const totalTasks = tasks.length;
  const ignoredTasks = tasks.filter((task) => task.deleted).length;
  const completionRate =
    totalTasks > 0 ? Math.floor((ignoredTasks / totalTasks) * 100) : 0;

  let level = "Novice Procrastinator";
  if (completionRate >= 50) level = "Intermediate Procrastinator";
  if (completionRate >= 75) level = "Advanced Procrastinator";
  if (completionRate >= 90) level = "Legendary Procrastinator";

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff9fc",
          padding: "40px",
          borderRadius: "20px",
          textAlign: "center",
          border: "5px double #ffcc00",
          maxWidth: "500px",
          width: "90%",
        }}
      >
        <div
          style={{
            fontSize: "2.5rem",
            color: "#ff3366",
            marginBottom: "20px",
          }}
        >
          🏆 Certificate of Procrastination 🏆
        </div>

        <div
          style={{
            fontSize: "1.2rem",
            marginBottom: "20px",
            lineHeight: "1.5",
          }}
        >
          This certifies that you have successfully avoided{" "}
          <strong>{ignoredTasks}</strong> tasks!
        </div>

        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#ff3366",
            margin: "20px 0",
          }}
        >
          Level: {level}
        </div>

        <div
          style={{
            fontSize: "1.1rem",
            marginBottom: "30px",
            fontStyle: "italic",
            color: "#666",
          }}
        >
          Your dedication to doing nothing is truly inspiring!
        </div>

        <button
          onClick={onClose}
          style={{
            backgroundColor: "#ff6699",
            color: "white",
            border: "none",
            padding: "12px 30px",
            borderRadius: "10px",
            fontSize: "1.1rem",
            cursor: "pointer",
          }}
        >
          Close This (Eventually)
        </button>
      </div>
    </div>
  );
};

export default Certificate;
