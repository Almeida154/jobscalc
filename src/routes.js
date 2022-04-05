const express = require('express');
const routes = express.Router();

const DashboardController = require('./controllers/DashboardController');
const ProfileController = require('./controllers/ProfileController');
const JobController = require('./controllers/JobController');

// Home
routes.get(['/', '/home'], DashboardController.index);

// Job
routes.get('/job', JobController.create);
routes.post('/job', JobController.save);

// Job Edit
routes.get('/job/:id', JobController.show);
routes.post('/job/:id', JobController.update);
routes.post('/job/delete/:id', JobController.delete);

// Profile
routes.get('/profile', ProfileController.index);
routes.post('/profile', ProfileController.update);

module.exports = routes;
