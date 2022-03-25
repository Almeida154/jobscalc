const express = require('express');
const routes = express.Router();

const getView = (name) => `${__dirname}/views/${name}`;

const Profile = {
  data: {
    name: 'David Almeida',
    avatar: 'https://github.com/Almeida154.png',
    monthlyBudget: 8500,
    daysPerWeek: 5,
    hoursPerDay: 5,
    vacationPerYear: 4,
    hourValue: 85,
  },

  controllers: {
    index(req, res) {
      return res.render(getView('profile'), { profile: Profile.data });
    },

    update(req, res) {
      const weeksPerYear = 52;
      const weeksPerMonth = (weeksPerYear - req.body['vacation-per-year']) / 12;
      const hoursPerWeek =
        req.body['hours-per-day'] * req.body['days-per-week'];
      const hoursPerMonth = hoursPerWeek * weeksPerMonth;

      Profile.data = {
        name: req.body.name,
        avatar: req.body.avatar,
        monthlyBudget: req.body['monthly-budget'],
        daysPerWeek: req.body['days-per-week'],
        hoursPerDay: req.body['hours-per-day'],
        vacationPerYear: req.body['vacation-per-year'],
        hourValue: req.body['monthly-budget'] / hoursPerMonth,
      };

      return res.redirect('/profile');
    },
  },
};

const Job = {
  data: [
    {
      id: 1,
      name: 'Pizzaria Guloso',
      dailyHours: 2,
      totalHours: 1,
      createdAt: Date.now(),
    },
    {
      id: 2,
      name: 'OneTwo Project',
      dailyHours: 3,
      totalHours: 47,
      createdAt: Date.now(),
    },
  ],

  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map((job) => {
        return {
          ...job,
          remaining: Job.services.remainingDays(job),
          status: Job.services.remainingDays(job) <= 0 ? 'done' : 'progress',
          budget: Job.services.calculateBudget(job, Profile.data.hourValue),
        };
      });
      return res.render(getView('index'), { jobs: updatedJobs });
    },

    save(req, res) {
      const lastId = Job.data[Job.data.length - 1]?.id || 0;

      Job.data.push({
        id: lastId + 1, // jobs.length
        name: req.body.name,
        dailyHours: req.body['daily-hours'],
        totalHours: req.body['total-hours'],
        createdAt: Date.now(),
      });

      return res.redirect('/');
    },

    create(req, res) {
      return res.render(getView('job'));
    },

    show(req, res) {
      const jobId = req.params.id;
      const job = Job.data.find((job) => Number(job.id) === Number(jobId));

      if (!job) return res.send('Job not found!');

      job.budget = Job.services.calculateBudget(job, Profile.data.hourValue);

      return res.render(getView('job-edit'), { job });
    },

    update(req, res) {
      const jobId = req.params.id;
      const job = Job.data.find((job) => Number(job.id) === Number(jobId));

      if (!job) return res.send('Job not found!');

      const updatedJob = {
        ...job,
        name: req.body.name,
        dailyHours: req.body['daily-hours'],
        totalHours: req.body['total-hours'],
      };

      Job.data = Job.data.map((job) => {
        if (Number(job.id) === Number(jobId)) job = updatedJob;
        return job;
      });

      res.redirect(`/job/${jobId}`);
    },

    delete(req, res) {
      const jobId = req.params.id;
      const job = Job.data.find((job) => Number(job.id) === Number(jobId));

      if (!job) return res.send('Job not found!');

      Job.data = Job.data.filter((job) => Number(job.id) !== Number(jobId));

      res.redirect('/');
    },
  },

  services: {
    remainingDays(job) {
      const totalDays = (job.totalHours / job.dailyHours).toFixed(0);
      const createdDate = new Date(job.createdAt);
      const dueDay = createdDate.getDate() + Number(totalDays);
      const dueDate = createdDate.setDate(dueDay);
      const remainingDaysInMS = dueDate - Date.now();
      const remainingDays = Math.floor(
        remainingDaysInMS / (1000 * 60 * 60 * 24)
      );
      return remainingDays;
    },
    calculateBudget: (job, hourValue) => hourValue * job.totalHours,
  },
};

// Home
routes.get(['/', '/home'], Job.controllers.index);

// Job
routes.get('/job', Job.controllers.create);
routes.post('/job', Job.controllers.save);

// Job Edit
routes.get('/job/:id', Job.controllers.show);
routes.post('/job/:id', Job.controllers.update);
routes.post('/job/delete/:id', Job.controllers.delete);

// Profile
routes.get('/profile', Profile.controllers.index);
routes.post('/profile', Profile.controllers.update);

module.exports = routes;
