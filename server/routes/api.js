const express = require("express");
const router = express.Router();
const WeatherData = require("../models/WeatherData");
const DailySummary = require("../models/DailySummary");
const { checkAlerts } = require("../services/alertService");

router.get("/current-weather", async (req, res) => {
  try {
    const currentWeather = await WeatherData.find().sort({ dt: -1 }).limit(6);
    res.json(
      currentWeather.map((weather) => ({
        city: weather.city,
        temp: weather.temp,
        main: weather.main,
        dt: weather.dt,
      }))
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/daily-summary", async (req, res) => {
  try {
    const summaries = await DailySummary.find().sort({ date: -1 }).limit(7);
    res.json(summaries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/alerts", async (req, res) => {
  try {
    const alerts = await checkAlerts();
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
