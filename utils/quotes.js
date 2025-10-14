export const funnyQuotes = [
  "Why rush greatness? Delay it.",
  "Focus is overrated.",
  "Tomorrow is the new today.",
  "Productivity is just peer pressure from dead people.",
  "Hard work pays off eventually, but procrastination pays off now.",
  "I'll give up procrastination when I get around to it.",
  "My favorite exercise is jumping to conclusions.",
  "I'm not lazy, I'm in energy-saving mode.",
  "I was going to procrastinate, but I kept putting it off.",
  "My brain has too many tabs open.",
  "I'm not procrastinating, I'm just prioritizing my free time.",
  "Error 404: Motivation not found.",
];

export const getRandomQuote = () => {
  return funnyQuotes[Math.floor(Math.random() * funnyQuotes.length)];
};
