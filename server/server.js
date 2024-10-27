require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");
const {
  fetchWeatherData,
  generateDailySummary,
} = require("./services/weatherService");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api", require("./routes/api"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Schedule weather data fetching
setInterval(fetchWeatherData, config.get("updateInterval"));

// Schedule daily summary generation (run once a day at midnight)
const scheduleDailySummary = () => {
  const now = new Date();
  const night = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1, // the next day
    0,
    0,
    0 // at 00:00:00 hours
  );
  const msToMidnight = night.getTime() - now.getTime();

  setTimeout(() => {
    generateDailySummary();
    // Then set it to run every 24 hours
    setInterval(generateDailySummary, 24 * 60 * 60 * 1000);
  }, msToMidnight);
};

scheduleDailySummary();