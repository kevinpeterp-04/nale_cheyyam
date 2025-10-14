// Simulate API calls for future Flask backend integration
export const fakeApi = {
  getTasks: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 500);
    });
  },

  addTask: (task) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...task, id: Date.now() });
      }, 300);
    });
  },

  getStats: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          tasksIgnored: Math.floor(Math.random() * 20),
          procrastinationLevel: Math.floor(Math.random() * 40 + 60),
          timeWasted: Math.floor(Math.random() * 180),
        });
      }, 400);
    });
  },
};
