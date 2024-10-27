const axios = require("axios");
const config = require("config");
const WeatherData = require("../models/WeatherData");
const DailySummary = require("../models/DailySummary");
const {
  kelvinToCelsius,
  getDominantCondition,
} = require("../utils/weatherUtils");

const API_KEY = process.env.OPENWEATHER_API_KEY;
const cities = config.get("cities");

const fetchWeatherData = async () => {
  for (const city of cities) {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      const { main, weather, dt } = response.data;

      const weatherData = new WeatherData({
        city,
        main: weather[0].main,
        temp: kelvinToCelsius(main.temp),
        feels_like: kelvinToCelsius(main.feels_like),
        dt: new Date(dt * 1000),
      });

      await weatherData.save();
      console.log(`Weather data saved for ${city}`);
    } catch (error) {
      console.error(`Error fetching weather data for ${city}:`, error.message);
    }
  }
};

const generateDailySummary = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const city of cities) {
    const dailyData = await WeatherData.find({
      city,
      dt: { $gte: today },
    });

    if (dailyData.length > 0) {
      const temps = dailyData.map((data) => data.temp);
      const conditions = dailyData.map((data) => data.main);

      const summary = new DailySummary({
        city,
        date: today,
        avgTemp: temps.reduce((a, b) => a + b) / temps.length,
        maxTemp: Math.max(...temps),
        minTemp: Math.min(...temps),
        dominantCondition: getDominantCondition(conditions),
      });

      await summary.save();
      console.log(`Daily summary generated for ${city}`);
    }
  }
};

module.exports = {
  fetchWeatherData,
  generateDailySummary,
};