let data = {
  name: 'David Almeida',
  avatar: 'https://github.com/Almeida154.png',
  monthlyBudget: 8500,
  daysPerWeek: 5,
  hoursPerDay: 5,
  vacationPerYear: 4,
  hourValue: 85,
};

module.exports = {
  get() {
    return data;
  },
  update(newData) {
    data = newData;
  },
};
