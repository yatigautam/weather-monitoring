import React from "react";
import HistoricalData from "../components/HistoricalData";
import CurrentWeather from "../components/CurrentWeather";

const Home = () => {
  return (
    <div className="home">
      <h1>Weather App</h1>
      <CurrentWeather />
      <HistoricalData />
    </div>
  );
};

export default Home;
