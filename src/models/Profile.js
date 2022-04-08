const Database = require('../database/config');

module.exports = {
  async get() {
    const db = await Database();
    const data = await db.get(`SELECT * FROM profiles`);
    await db.close();

    return {
      name: data.name,
      avatar: data.avatar,
      monthlyBudget: data.monthly_budget,
      daysPerWeek: data.days_per_week,
      hoursPerDay: data.hours_per_day,
      vacationPerYear: data.vacation_per_year,
      hourValue: data.hour_value,
    };
  },

  async update(newData) {
    const db = await Database();
    const data = await db.get(`
      UPDATE profiles SET
        name = "${newData.name}",
        avatar = "${newData.avatar}",
        monthly_budget = ${newData.monthlyBudget},
        days_per_week = ${newData.daysPerWeek},
        hours_per_day = ${newData.hoursPerDay},
        vacation_per_year = ${newData.vacationPerYear},
        hour_value = ${newData.hourValue}
    `);
    db.close();
  },
};
