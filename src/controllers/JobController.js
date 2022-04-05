const Profile = require('../models/Profile');
const Job = require('../models/Job');
const JobUtils = require('../utils/JobUtils');

module.exports = {
  save(req, res) {
    const jobs = Job.get();
    const lastId = jobs[jobs.length - 1]?.id || 0;

    jobs.push({
      id: lastId + 1, // jobs.length
      name: req.body.name,
      dailyHours: req.body['daily-hours'],
      totalHours: req.body['total-hours'],
      createdAt: Date.now(),
    });

    return res.redirect('/');
  },

  create(req, res) {
    return res.render('job');
  },

  show(req, res) {
    const jobs = Job.get();
    const jobId = req.params.id;
    const job = jobs.find((job) => Number(job.id) === Number(jobId));

    if (!job) return res.send('Job not found!');

    job.budget = JobUtils.calculateBudget(job, Profile.get().hourValue);

    return res.render('job-edit', { job });
  },

  update(req, res) {
    const jobs = Job.get();
    const jobId = req.params.id;
    const job = jobs.find((job) => Number(job.id) === Number(jobId));

    if (!job) return res.send('Job not found!');

    const updatedJob = {
      ...job,
      name: req.body.name,
      dailyHours: req.body['daily-hours'],
      totalHours: req.body['total-hours'],
    };

    Job.update(updatedJob, jobId);
    res.redirect(`/job/${jobId}`);
  },

  delete(req, res) {
    const jobs = Job.get();
    const job = jobs.find((job) => Number(job.id) === Number(req.params.id));
    if (!job) return res.send('Job not found!');

    Job.delete(req.params.id);
    res.redirect('/');
  },
};
