const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

console.log("API Key:", process.env.API_KEY);

const app = express();
const PORT = 3000;

// List of metro cities to fetch weather data for
const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

// OpenWeatherMap API endpoint
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// In-memory storage for weather summaries (replace with DB in production)
let dailySummary = {};

// Serve static files from "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Fetch weather data from OpenWeatherMap API
async function fetchWeather(city) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: process.env.API_KEY,
        units: 'metric', // Celsius
      },
    });

    console.log(`Weather data for ${city}:`, response.data); // Add this line
    
    const { main, weather, dt } = response.data;

    return {
      city,
      temp: main.temp,
      feels_like: main.feels_like,
      condition: weather[0].main,
      timestamp: dt * 1000,
    };
  } catch (error) {
    console.error(`Error fetching weather for ${city}: ${error.message}`);
    return null;
  }
}

// Calculate daily weather summary
function updateDailySummary(weatherData) {
  const today = new Date().toDateString();
  console.log(`Updating summary for ${today}:`, weatherData);

  if (!dailySummary[today]) {
    dailySummary[today] = {
      temperatures: [],
      conditions: {},
      maxTemp: -Infinity,
      minTemp: Infinity,
    };
  }

  const summary = dailySummary[today];
  summary.temperatures.push(weatherData.temp);
  summary.maxTemp = Math.max(summary.maxTemp, weatherData.temp);
  summary.minTemp = Math.min(summary.minTemp, weatherData.temp);
  summary.conditions[weatherData.condition] =
    (summary.conditions[weatherData.condition] || 0) + 1;
}

  // Update temperature records
  summary.temperatures.push(weatherData.temp);
  summary.maxTemp = Math.max(summary.maxTemp, weatherData.temp);
  summary.minTemp = Math.min(summary.minTemp, weatherData.temp);

  // Track occurrences of weather conditions
  summary.conditions[weatherData.condition] =
    (summary.conditions[weatherData.condition] || 0) + 1;
    

// Calculate dominant weather condition
function getDominantCondition(conditions) {
  return Object.keys(conditions).reduce((a, b) =>
    conditions[a] > conditions[b] ? a : b
  );
}

// Periodically fetch weather data and update summaries
async function monitorWeather() {
  console.log("Fetching weather data...");
  for (const city of cities) {
    const weatherData = await fetchWeather(city);
    if (weatherData) updateDailySummary(weatherData);
  }
  console.log('Weather data updated:', dailySummary);
}

// Start periodic monitoring (every 5 minutes)
setInterval(monitorWeather, 5 * 60 * 1000); // 5 minutes

// API to get daily summary
app.get('/api/summary', (req, res) => {
  const today = new Date().toDateString();
  const summary = dailySummary[today];

  if (!summary) {
    return res.status(404).json({ message: 'No weather data available for today.' });
  }

  const dominantCondition = getDominantCondition(summary.conditions);

  res.json({
    date: today,
    avgTemp:
      summary.temperatures.reduce((a, b) => a + b, 0) / summary.temperatures.length,
    maxTemp: summary.maxTemp,
    minTemp: summary.minTemp,
    dominantCondition,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
