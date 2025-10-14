import React, { useState } from "react";
import { applyChaos, funnyTaskNames } from "../utils/chaos";

const TaskList = ({ tasks, setTasks, chaosLevel }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskPriority, setTaskPriority] = useState("low");
  const [taskDeadline, setTaskDeadline] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      description: taskDescription,
      priority: taskPriority,
      deadline: taskDeadline,
      deleted: false,
    };

    const chaoticTask = applyChaos(newTask, chaosLevel);
    setTasks([...tasks, chaoticTask]);

    // Clear form
    setTaskTitle("");
    setTaskDescription("");
    setTaskPriority("low");
  };

  const handleAddRandomTask = () => {
    const randomTitle =
      funnyTaskNames[Math.floor(Math.random() * funnyTaskNames.length)];
    const randomDescription = "This is definitely important... probably.";
    const randomPriority = ["low", "medium", "high"][
      Math.floor(Math.random() * 3)
    ];

    const randomDate = new Date();
    randomDate.setDate(
      randomDate.getDate() + Math.floor(Math.random() * 30) + 1
    );
    const randomDeadline = randomDate.toISOString().split("T")[0];

    const newTask = {
      id: Date.now(),
      title: randomTitle,
      description: randomDescription,
      priority: randomPriority,
      deadline: randomDeadline,
      deleted: false,
    };

    const chaoticTask = applyChaos(newTask, chaosLevel);
    setTasks([...tasks, chaoticTask]);
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2>Your "Important" Tasks</h2>

      <form onSubmit={handleAddTask} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Task Title
          </label>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="What you should be doing..."
            style={{
              width: "100%",
              padding: "10px",
              border: "2px dashed #ff99cc",
              borderRadius: "10px",
              fontSize: "1rem",
              backgroundColor: "#fff9fc",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Description
          </label>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Details you'll never read..."
            rows="2"
            style={{
              width: "100%",
              padding: "10px",
              border: "2px dashed #ff99cc",
              borderRadius: "10px",
              fontSize: "1rem",
              backgroundColor: "#fff9fc",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Priority
          </label>
          <select
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "2px dashed #ff99cc",
              borderRadius: "10px",
              fontSize: "1rem",
              backgroundColor: "#fff9fc",
            }}
          >
            <option value="low">Low (Ignore indefinitely)</option>
            <option value="medium">Medium (Maybe tomorrow)</option>
            <option value="high">High (Panic later)</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Deadline
          </label>
          <input
            type="date"
            value={taskDeadline}
            onChange={(e) => setTaskDeadline(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "2px dashed #ff99cc",
              borderRadius: "10px",
              fontSize: "1rem",
              backgroundColor: "#fff9fc",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#ff6699",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            fontSize: "1rem",
            cursor: "pointer",
            marginRight: "10px",
            marginBottom: "10px",
          }}
        >
          Add Task (Why bother?)
        </button>

        <button
          type="button"
          onClick={handleAddRandomTask}
          style={{
            backgroundColor: "#ffcc00",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            fontSize: "1rem",
            cursor: "pointer",
            marginRight: "10px",
            marginBottom: "10px",
          }}
        >
          Add Random Task
        </button>
      </form>

      <ul style={{ listStyleType: "none" }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              backgroundColor: "#fff9fc",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "10px",
              borderLeft: "5px solid #ffcc00",
              opacity: task.deleted ? 0.6 : 1,
              textDecoration: task.deleted ? "line-through" : "none",
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
              {task.title}
            </div>
            <div style={{ color: "#666", marginBottom: "5px" }}>
              {task.description}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.9rem",
                color: "#888",
              }}
            >
              <span>Priority: {task.priority}</span>
              <span>
                Deadline: {new Date(task.deadline).toLocaleDateString()}
              </span>
            </div>
            {task.deleted && (
              <div style={{ color: "red", marginTop: "5px" }}>
                ❌ Deleted by ProcrastinApp
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
