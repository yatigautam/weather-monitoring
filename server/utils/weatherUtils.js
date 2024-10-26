const kelvinToCelsius = (kelvin) => {
  return kelvin - 273.15;
};

const getDominantCondition = (conditions) => {
  const counts = conditions.reduce((acc, condition) => {
    acc[condition] = (acc[condition] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
};

module.exports = {
  kelvinToCelsius,
  getDominantCondition,
};
