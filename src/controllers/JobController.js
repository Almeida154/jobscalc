const Profile = require('../models/Profile');
const Job = require('../models/Job');
const JobUtils = require('../utils/JobUtils');

module.exports = {
  async save(req, res) {
    await Job.create({
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

  async show(req, res) {
    const jobs = await Job.get();
    const { hourValue } = await Profile.get();

    const jobId = req.params.id;
    const job = jobs.find((job) => Number(job.id) === Number(jobId));

    if (!job) return res.send('Job not found!');

    job.budget = JobUtils.calculateBudget(job, hourValue);

    return res.render('job-edit', { job });
  },

  async update(req, res) {
    const jobs = await Job.get();
    const jobId = req.params.id;

    const job = jobs.find((job) => Number(job.id) === Number(jobId));
    if (!job) return res.send('Job not found!');

    const updatedJob = {
      ...job,
      name: req.body.name,
      dailyHours: req.body['daily-hours'],
      totalHours: req.body['total-hours'],
    };

    await Job.update(updatedJob, jobId);
    res.redirect(`/job/${jobId}`);
  },

  async delete(req, res) {
    const jobs = await Job.get();
    const job = jobs.find((job) => Number(job.id) === Number(req.params.id));
    if (!job) return res.send('Job not found!');

    await Job.delete(req.params.id);
    res.redirect('/');
  },
};
