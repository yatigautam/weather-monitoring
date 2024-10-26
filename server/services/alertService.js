const config = require("config");
const WeatherData = require("../models/WeatherData");

const temperatureThreshold = config.get("temperatureThreshold");
const consecutiveUpdates = config.get("consecutiveUpdates");

const checkAlerts = async () => {
  const cities = config.get("cities");
  const alerts = [];

  for (const city of cities) {
    const recentData = await WeatherData.find({ city })
      .sort({ dt: -1 })
      .limit(consecutiveUpdates);

    if (
      recentData.length === consecutiveUpdates &&
      recentData.every((data) => data.temp > temperatureThreshold)
    ) {
      alerts.push(
        `Alert: Temperature in ${city} has exceeded ${temperatureThreshold}°C for ${consecutiveUpdates} consecutive updates.`
      );
    }
  }

  return alerts;
};

module.exports = {
  checkAlerts,
};
