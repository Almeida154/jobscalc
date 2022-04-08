const Database = require('./config');

const initDatabase = {
  async init() {
    const db = await Database();

    await db.exec(`
        CREATE TABLE profiles (
            id INTEGER PRIMARY KEY AUTOINCREMENT
            ,name TEXT
            ,avatar TEXT
            ,monthly_budget INT
            ,days_per_week INT
            ,hours_per_day INT
            ,vacation_per_year INT
            ,hour_value INT
        );

        CREATE TABLE jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT
            ,name TEXT
            ,daily_hours TEXT
            ,total_hours INT
            ,created_at DATETIME
        );
    `);

    await db.run(`
        INSERT INTO profiles (
            name,
            avatar,
            monthly_budget,
            days_per_week,
            hours_per_day,
            vacation_per_year,
            hour_value
        ) VALUES ("David Almeida", "https://github.com/Almeida154.png", 5500, 5, 5, 4, 70);
    `);

    await db.run(`
        INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES ("Pizzaria Guloso", 2, 1, 1649259866352);
    `);

    await db.run(`
        INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES ("OneTwoProject", 2, 1, 1649259866352);
    `);

    await db.close();
  },
};

initDatabase.init();
