const Job = require('../models/Job');
const Profile = require('../models/Profile');
const JobUtils = require('../utils/JobUtils');

module.exports = {
  async index(req, res) {
    const profile = await Profile.get();
    const jobs = await Job.get();

    let stats = {
      progress: 0,
      done: 0,
      total: jobs.length,
    };

    let usedHours = 0;

    const updatedJobs = jobs.map((job) => {
      const status = JobUtils.remainingDays(job) <= 0 ? 'done' : 'progress';
      stats[status] += 1;
      usedHours += status == 'progress' ? Number(job.dailyHours) : 0;
      return {
        ...job,
        remaining: JobUtils.remainingDays(job),
        budget: JobUtils.calculateBudget(job, profile.hourValue),
        status,
      };
    });

    let freeHours = profile.hoursPerDay - usedHours;

    return res.render('index', {
      jobs: updatedJobs,
      profile: profile,
      stats,
      freeHours,
    });
  },
};
