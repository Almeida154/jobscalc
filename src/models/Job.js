const Database = require('../database/config');

module.exports = {
  async get() {
    const db = await Database();
    const data = await db.all(`SELECT * FROM jobs`);
    await db.close();

    return data.map((job) => ({
      id: job.id,
      name: job.name,
      dailyHours: job.daily_hours,
      totalHours: job.total_hours,
      createdAt: job.created_at,
    }));
  },

  async create(newJob) {
    const db = await Database();
    await db.run(`
      INSERT INTO jobs (name, daily_hours, total_hours, created_at) VALUES (
        "${newJob.name}", ${newJob.dailyHours}, ${newJob.totalHours}, ${newJob.createdAt}
      )
    `);
    await db.close();
  },

  async update(updatedJob, jobId) {
    const db = await Database();
    db.run(`
      UPDATE jobs SET
        name = "${updatedJob.name}",
        daily_hours = ${updatedJob.dailyHours},
        total_hours = ${updatedJob.totalHours},
        created_at = ${updatedJob.createdAt}
          WHERE id = ${jobId}
    `);
    await db.close();
  },

  async delete(id) {
    const db = await Database();
    await db.run(`DELETE FROM jobs WHERE id = ${id}`);
    await db.close();
  },
};
