const express = require('express');
const routes = express.Router();

const getView = (name) => `${__dirname}/views/${name}`;

routes.get(['/', '/home'], (req, res) => res.render(getView('index')));
routes.get('/job', (req, res) => res.render(getView('job')));
routes.get('/job/edit', (req, res) => res.render(getView('job-edit')));
routes.get('/profile', (req, res) => res.render(getView('profile')));

module.exports = routes;
