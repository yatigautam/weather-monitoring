const weatherService = require("../services/weatherService");
const WeatherData = require("../models/WeatherData");

const cities = [
  "Delhi",
  "Mumbai",
  "Chennai",
  "Bangalore",
  "Kolkata",
  "Hyderabad",
];
const thresholds = {
  temperature: 35, // Celsius
};

const fetchWeatherForCities = async () => {
  for (const city of cities) {
    try {
      const weatherData = await weatherService.fetchWeatherData(city);
      const summary = weatherService.calculateDailyAggregates([weatherData]);
      await weatherService.storeDailySummary(city, summary);

      const alerts = weatherService.checkThresholds(weatherData, thresholds);
      if (alerts.length > 0) {
        summary.alerts = alerts;
      }
    } catch (error) {
      console.error(`Error fetching weather data for ${city}:`, error);
    }
  }
};

// Set an interval to fetch data every 5 minutes
setInterval(fetchWeatherForCities, 5 * 60 * 1000);

const getWeatherSummaries = async (req, res) => {
  try {
    const summaries = await WeatherData.find();
    res.json(summaries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getWeatherAlerts = async (req, res) => {
  try {
    const alerts = await WeatherData.find({
      alerts: { $exists: true, $ne: [] },
    });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getWeatherSummaries,
  getWeatherAlerts,
};
