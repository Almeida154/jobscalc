const Profile = require('../models/Profile');

module.exports = {
  async index(req, res) {
    return res.render('profile', { profile: await Profile.get() });
  },

  async update(req, res) {
    const weeksPerYear = 52;
    const weeksPerMonth = (weeksPerYear - req.body['vacation-per-year']) / 12;
    const hoursPerWeek = req.body['hours-per-day'] * req.body['days-per-week'];
    const hoursPerMonth = hoursPerWeek * weeksPerMonth;

    await Profile.update({
      name: req.body.name,
      avatar: req.body.avatar,
      monthlyBudget: req.body['monthly-budget'],
      daysPerWeek: req.body['days-per-week'],
      hoursPerDay: req.body['hours-per-day'],
      vacationPerYear: req.body['vacation-per-year'],
      hourValue: req.body['monthly-budget'] / hoursPerMonth,
    });

    return res.redirect('/profile');
  },
};
