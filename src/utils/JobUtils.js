module.exports = {
  remainingDays(job) {
    const totalDays = (job.totalHours / job.dailyHours).toFixed(0);
    const createdDate = new Date(job.createdAt);
    const dueDay = createdDate.getDate() + Number(totalDays);
    const dueDate = createdDate.setDate(dueDay);
    const remainingDaysInMS = dueDate - Date.now();
    const remainingDays = Math.floor(remainingDaysInMS / (1000 * 60 * 60 * 24));
    return remainingDays;
  },
  calculateBudget: (job, hourValue) => hourValue * job.totalHours,
};
