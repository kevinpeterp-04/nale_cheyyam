// static/js/script.js
document.addEventListener("DOMContentLoaded", () => {
  // --- State Management ---
  const state = {
    tasksDeleted: 0,
    focusFails: 0,
  };

  // --- Navigation ---
  const navLinks = document.querySelectorAll(".nav-link");
  const pages = document.querySelectorAll(".page");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("data-target");

      pages.forEach((page) => {
        page.classList.toggle("active", page.id === targetId);
      });

      navLinks.forEach((navLink) => {
        navLink.classList.toggle(
          "active",
          navLink.getAttribute("data-target") === targetId
        );
      });
    });
  });

  // --- Task Management ---
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("new-task-input");
  const taskList = document.getElementById("task-list");

  const renderTasks = async () => {
    const response = await fetch("/api/tasks");
    const tasks = await response.json();
    taskList.innerHTML = "";
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.setAttribute("data-id", task.id);
      li.innerHTML = `
                <div class="task-text-container">
                    <span class="task-text">${task.text}</span>
                    <span class="task-priority">${task.priority}</span>
                </div>
                <div class="task-actions">
                    <button class="mutate-btn">Mutate</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
      taskList.appendChild(li);
    });
  };

  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text) {
      await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      taskInput.value = "";
      renderTasks();
    }
  });

  taskList.addEventListener("click", async (e) => {
    const taskId = e.target.closest("li").dataset.id;
    if (e.target.classList.contains("delete-btn")) {
      await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
      state.tasksDeleted++;
      updateAchievements();
      renderTasks();
    }
    if (e.target.classList.contains("mutate-btn")) {
      await fetch(`/api/tasks/${taskId}`, { method: "PUT" });
      renderTasks();
    }
  });

  // --- AI Procrastination Coach ---
  const aiChatBox = document.getElementById("ai-chat-box");
  const aiUserInput = document.getElementById("ai-user-input");
  const aiSendBtn = document.getElementById("ai-send-btn");
  const aiResponses = [
    "Hmm... my advanced algorithms suggest a strategic nap is in order.",
    "AI calculation complete: Doing nothing increases creativity by precisely 84.7%.",
    "Consider this: if you wait long enough, the problem might just solve itself.",
    "I've cross-referenced your query with 10 million cat videos. The answer is: watch another one.",
    "Energy levels are low. I recommend conserving power by remaining stationary.",
    "Let's reframe 'procrastination' as 'selective participation'. Feels better, right?",
  ];

  const addMessageToChat = (text, sender) => {
    const messageDiv = document.createElement("div");
    messageDiv.className = `${sender}-message`;
    messageDiv.textContent = text;
    aiChatBox.appendChild(messageDiv);
    aiChatBox.scrollTop = aiChatBox.scrollHeight;
  };

  aiSendBtn.addEventListener("click", () => {
    const userText = aiUserInput.value.trim();
    if (!userText) return;

    addMessageToChat(userText, "user");
    aiUserInput.value = "";

    const thinkingDiv = document.createElement("div");
    thinkingDiv.className = "ai-message ai-thinking";
    thinkingDiv.textContent = "Consulting the void...";
    aiChatBox.appendChild(thinkingDiv);
    aiChatBox.scrollTop = aiChatBox.scrollHeight;

    setTimeout(() => {
      thinkingDiv.remove();
      const aiResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];
      addMessageToChat(aiResponse, "ai");
    }, 1500 + Math.random() * 1000);
  });

  // --- Analytics with Fake Data (Chart.js) ---
  const renderCharts = () => {
    const hoursCtx = document
      .getElementById("hours-wasted-chart")
      .getContext("2d");
    new Chart(hoursCtx, {
      type: "bar",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Hours Wasted",
            data: [8, 6, 10, 7, 9, 12, 5],
            backgroundColor: "rgba(233, 69, 96, 0.6)",
            borderColor: "rgba(233, 69, 96, 1)",
            borderWidth: 1,
          },
        ],
      },
    });

    const distractionCtx = document
      .getElementById("distraction-source-chart")
      .getContext("2d");
    new Chart(distractionCtx, {
      type: "doughnut",
      data: {
        labels: ["YouTube", "Social Media", "Snacks", "Staring Blankly"],
        datasets: [
          {
            data: [45, 30, 15, 10],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          },
        ],
      },
    });
  };

  document.getElementById("sync-calendar-btn").addEventListener("click", () => {
    alert("Authorization failed: You're too lazy.");
  });

  // --- Focus Mode ---
  const startFocusBtn = document.getElementById("start-focus-btn");
  const focusModal = document.getElementById("focus-distraction-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const timerDisplay = document.getElementById("focus-timer-display");
  let focusInterval;

  startFocusBtn.addEventListener("click", () => {
    startFocusBtn.disabled = true;
    let duration = 5; // Shortened for demo purposes

    // Random distraction time
    const distractionTime = Math.floor(Math.random() * (duration - 2)) + 2;

    focusInterval = setInterval(() => {
      duration--;
      const minutes = String(Math.floor(duration / 60)).padStart(2, "0");
      const seconds = String(duration % 60).padStart(2, "0");
      timerDisplay.textContent = `${minutes}:${seconds}`;

      if (duration === distractionTime) {
        focusModal.style.display = "flex";
      }

      if (duration <= 0) {
        clearInterval(focusInterval);
        timerDisplay.textContent = "You... did it?";
        startFocusBtn.disabled = false;
      }
    }, 1000);
  });

  closeModalBtn.addEventListener("click", () => {
    clearInterval(focusInterval);
    focusModal.style.display = "none";
    timerDisplay.textContent = "Focus failed. As expected.";
    startFocusBtn.disabled = false;
    state.focusFails++;
    updateAchievements();
  });

  // --- Productivity Certificates ---
  const downloadCertBtn = document.getElementById("download-cert-btn");

  const updateAchievements = () => {
    if (state.tasksDeleted >= 1) {
      document.getElementById("ach-delete-1").classList.add("unlocked");
      document.getElementById("cert-rank").textContent = "Amateur Avoider";
    }
    if (state.tasksDeleted >= 5) {
      document.getElementById("ach-delete-5").classList.add("unlocked");
      document.getElementById("cert-rank").textContent = "Master of Avoidance";
    }
    if (state.focusFails >= 1) {
      document.getElementById("ach-focus-fail").classList.add("unlocked");
    }
  };

  downloadCertBtn.addEventListener("click", () => {
    const certCard = document.getElementById("certificate-card");
    html2canvas(certCard).then((canvas) => {
      const link = document.createElement("a");
      link.download = "procrastination-certificate.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  });

  // --- Initial Load ---
  const initializeApp = () => {
    renderTasks();
    renderCharts();
    updateAchievements();
  };

  initializeApp();
});
