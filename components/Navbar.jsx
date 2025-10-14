import React from "react";

const Navbar = () => {
  return (
    <header
      style={{
        textAlign: "center",
        marginBottom: "30px",
        padding: "20px",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: "20px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "10px",
          color: "#ff3366",
        }}
      >
        ProcrastinApp 💤
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          color: "#666",
        }}
      >
        The only productivity tool that guarantees you'll never be productive
        again
      </p>
    </header>
  );
};

export default Navbar;
