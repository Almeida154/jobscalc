const Job = require('../models/Job');
const Profile = require('../models/Profile');
const JobUtils = require('../utils/JobUtils');

module.exports = {
  index(req, res) {
    let stats = {
      progress: 0,
      done: 0,
      total: Job.get().length,
    };

    let usedHours = 0;

    const updatedJobs = Job.get().map((job) => {
      const status = JobUtils.remainingDays(job) <= 0 ? 'done' : 'progress';
      stats[status] += 1;
      usedHours += status == 'progress' ? Number(job.dailyHours) : 0;
      return {
        ...job,
        remaining: JobUtils.remainingDays(job),
        budget: JobUtils.calculateBudget(job, Profile.get().hourValue),
        status,
      };
    });

    let freeHours = Profile.get().hoursPerDay - usedHours;

    return res.render('index', {
      jobs: updatedJobs,
      profile: Profile.get(),
      stats,
      freeHours,
    });
  },
};
