const mongoose = require("mongoose");

const WeatherDataSchema = new mongoose.Schema({
  city: String,
  main: String,
  temp: Number,
  feels_like: Number,
  dt: Date,
});

module.exports = mongoose.model("WeatherData", WeatherDataSchema);
