export const funnyTaskNames = [
  "Take a strategic nap",
  "Scroll aimlessly",
  "Contemplate existence",
  "Organize cables for no reason",
  "Stare at wall meaningfully",
  "Refresh social media feed",
  "Research cat videos",
  "Practice avoiding eye contact",
  "Plan to plan later",
  "Reorganize desktop icons",
  "Watch paint dry (metaphorically)",
  "Debate life choices with pet",
];

export const distractions = [
  "https://www.youtube.com",
  "https://www.reddit.com",
  "https://www.instagram.com",
  "https://www.tiktok.com",
  "https://www.twitter.com",
  "https://www.netflix.com",
];

export const applyChaos = (task, chaosLevel = 1) => {
  const newTask = { ...task };
  const chaosProbability = chaosLevel * 0.3;

  // Randomly change title
  if (Math.random() < chaosProbability) {
    newTask.title =
      funnyTaskNames[Math.floor(Math.random() * funnyTaskNames.length)];
  }

  // Randomly extend deadline
  if (Math.random() < chaosProbability * 0.7) {
    if (newTask.deadline) {
      const newDate = new Date(newTask.deadline);
      newDate.setDate(newDate.getDate() + Math.floor(Math.random() * 14) + 1);
      newTask.deadline = newDate.toISOString().split("T")[0];
    }
  }

  // Randomly delete task
  if (Math.random() < chaosProbability * 0.3) {
    newTask.deleted = true;
  }

  return newTask;
};

export const getRandomDistraction = () => {
  return distractions[Math.floor(Math.random() * distractions.length)];
};
