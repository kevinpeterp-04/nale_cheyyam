// static/js/script.js
document.addEventListener("DOMContentLoaded", () => {
  // A home for all our important variables and counters.
  // Basically, keeping track of your glorious achievements (or lack thereof).
  const state = {
    tasksDeleted: 0,
    focusFails: 0,
  };
  // To keep our charts from getting weird if you look at them more than once.
  let hoursChart, distractionChart;

  // --- The magic that makes the sidebar buttons actually go somewhere ---
  const navLinks = document.querySelectorAll(".nav-link");
  const pages = document.querySelectorAll(".page");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("data-target");

      // Hide all the pages
      pages.forEach((page) => page.classList.remove("active"));
      // Show the one you clicked on
      document.getElementById(targetId).classList.add("active");

      // Make the button look fancy and active
      navLinks.forEach((navLink) => navLink.classList.remove("active"));
      link.classList.add("active");

      // NEW: If we're looking at the analytics page, let's mess with the charts
      if (targetId === "analytics") {
        renderCharts();
      }
    });
  });

  // --- All the stuff for managing your "To-Do" list ---
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("new-task-input");
  const taskList = document.getElementById("task-list");

  // Go get the tasks from the server and slap them on the page.
  const renderTasks = async () => {
    const response = await fetch("/api/tasks");
    const tasks = await response.json();
    taskList.innerHTML = ""; // Clear out the old list first
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

  // When you're brave enough to add a new task...
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (!text) return; // Don't add empty tasks, that's just silly.

    // NEW FUN FEATURE: Sometimes, the task just gets... lost.
    if (Math.random() < 0.1) {
      // 10% chance of failure
      alert(
        "Oops! The hamster that powers our server fell asleep. Your task got lost in the void. Maybe try again?"
      );
      taskInput.value = "";
      return;
    }

    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    taskInput.value = ""; // Clear the input box
    renderTasks(); // Update the list
  });

  // When you click the buttons on a task.
  taskList.addEventListener("click", async (e) => {
    const taskItem = e.target.closest("li");
    if (!taskItem) return; // Clicked somewhere else

    const taskId = taskItem.dataset.id;

    // So you want to delete a task? Fine. CELEBRATE!
    if (e.target.classList.contains("delete-btn")) {
      await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
      // Make it rain confetti because you're avoiding work.
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
      state.tasksDeleted++; // Another one bites the dust.
      updateAchievements();
      renderTasks();
    }

    // Or maybe you want to see what this task becomes...
    if (e.target.classList.contains("mutate-btn")) {
      await fetch(`/api/tasks/${taskId}`, { method: "PUT" });
      renderTasks();
    }
  });

  // --- Your very own "AI" life coach ---
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
    "You could do the task... or you could see how many crackers you can stack on your forehead. Your call.",
    "My purpose is to help. So, I'm helping you realize that this can wait until tomorrow. You're welcome.",
  ];

  // A little helper to add messages to the chat window.
  const addMessageToChat = (text, sender) => {
    const messageDiv = document.createElement("div");
    messageDiv.className = `${sender}-message`;
    messageDiv.textContent = text;
    aiChatBox.appendChild(messageDiv);
    aiChatBox.scrollTop = aiChatBox.scrollHeight; // Always scroll to the latest message
  };

  // When you ask the AI for its infinite wisdom.
  aiSendBtn.addEventListener("click", () => {
    const userText = aiUserInput.value.trim();
    if (!userText) return;

    addMessageToChat(userText, "user");
    aiUserInput.value = "";

    // Pretend to think really hard.
    addMessageToChat("Consulting the void...", "ai-thinking");

    setTimeout(() => {
      // Okay, done "thinking".
      document.querySelector(".ai-thinking").remove();
      const aiResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];
      addMessageToChat(aiResponse, "ai");
    }, 1500 + Math.random() * 1000); // Wait a random amount of time to seem legit
  });

  // --- All the pretty (and useless) charts ---
  const renderCharts = () => {
    // If charts already exist, destroy them before making new ones.
    if (hoursChart) hoursChart.destroy();
    if (distractionChart) distractionChart.destroy();

    // Totally scientific data, generated right now.
    const hoursData = Array.from(
      { length: 7 },
      () => Math.floor(Math.random() * 12) + 1
    );
    const distractionData = [
      Math.random() * 50,
      Math.random() * 40,
      Math.random() * 20,
      Math.random() * 10,
    ];

    const hoursCtx = document
      .getElementById("hours-wasted-chart")
      .getContext("2d");
    hoursChart = new Chart(hoursCtx, {
      type: "bar",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Hours Wasted",
            data: hoursData,
            backgroundColor: "rgba(233, 69, 96, 0.6)",
          },
        ],
      },
    });

    const distractionCtx = document
      .getElementById("distraction-source-chart")
      .getContext("2d");
    distractionChart = new Chart(distractionCtx, {
      type: "doughnut",
      data: {
        labels: ["YouTube", "Social Media", "Snacks", "Staring Blankly"],
        datasets: [
          {
            data: distractionData,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          },
        ],
      },
    });
  };

  // The Sync button that will never, ever work.
  document.getElementById("sync-calendar-btn").addEventListener("click", () => {
    alert(
      "Authorization failed: You're just not trying hard enough. Or maybe you are. I dunno."
    );
  });

  // --- The infamous Focus Mode ---
  const startFocusBtn = document.getElementById("start-focus-btn");
  const focusModal = document.getElementById("focus-distraction-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const timerDisplay = document.getElementById("focus-timer-display");
  let focusInterval;

  const distractionWebsites = [
    "https://www.youtube.com",
    "https://www.reddit.com",
    "https://www.instagram.com",
  ];

  startFocusBtn.addEventListener("click", () => {
    startFocusBtn.disabled = true;
    let duration = 25; // Good luck lasting 25 seconds.

    const distractionTime = Math.floor(Math.random() * 15) + 5; // Distraction hits between 5-20 seconds.

    focusInterval = setInterval(() => {
      // NEW FUN FEATURE: Make the timer wobble because focus isn't linear.
      if (Math.random() < 0.2) {
        // 20% chance each second
        duration += Math.random() > 0.5 ? 2 : -2; // Randomly add or subtract time
      }
      duration = Math.max(0, duration - 1); // Decrease time, but don't go below zero.

      const minutes = String(Math.floor(duration / 60)).padStart(2, "0");
      const seconds = String(duration % 60).padStart(2, "0");
      timerDisplay.textContent = `${minutes}:${seconds}`;

      if (duration <= distractionTime && duration > 0) {
        // Check if it's time for the big distraction
        clearInterval(focusInterval); // Aaaand we're done here.
        state.focusFails++;
        updateAchievements();

        focusModal.querySelector("h3").textContent = "🚨 FOCUS COMPROMISED! 🚨";
        focusModal.querySelector("p").textContent =
          "Redirecting you somewhere better...";
        focusModal.style.display = "flex";

        setTimeout(() => {
          const randomSite =
            distractionWebsites[
              Math.floor(Math.random() * distractionWebsites.length)
            ];
          window.location.href = randomSite;
        }, 2000);
      }

      if (duration <= 0) {
        clearInterval(focusInterval);
        timerDisplay.textContent = "You... actually did it?";
        startFocusBtn.disabled = false;
      }
    }, 1000);
  });

  closeModalBtn.addEventListener("click", () => {
    focusModal.style.display = "none";
  });

  // --- Certificates & Achievements: Your wall of shame... or fame? ---
  const downloadCertBtn = document.getElementById("download-cert-btn");

  // Check your stats and give you a shiny new title.
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

  // Download a picture of your glorious certificate.
  downloadCertBtn.addEventListener("click", () => {
    const certCard = document.getElementById("certificate-card");
    html2canvas(certCard).then((canvas) => {
      const link = document.createElement("a");
      link.download = "procrastination-certificate.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  });

  // --- NEW: Making the Settings toggles actually do something silly ---
  const motivationToggle = document.getElementById("toggle-motivation");
  motivationToggle.addEventListener("change", () => {
    if (motivationToggle.checked) {
      document.body.classList.add("desaturated");
      // Let's not be too mean, it wears off.
      setTimeout(() => {
        document.body.classList.remove("desaturated");
        motivationToggle.checked = false;
      }, 3000);
    }
  });

  // This one is just a checkbox. It does nothing. The perfect setting.
  // Let's be honest, you're already enabling more distractions by being here.

  // --- Kicking things off when the page loads ---
  const initializeApp = () => {
    renderTasks(); // Get the tasks
    renderCharts(); // Draw the charts
    updateAchievements(); // Check for any medals you've earned
  };

  initializeApp();
});
