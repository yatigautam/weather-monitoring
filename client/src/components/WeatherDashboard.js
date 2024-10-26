import React, { useState, useEffect } from "react";
import DailySummary from "./DailySummary";
import AlertsDisplay from "./AlertsDisplay";
import WeatherChart from "./WeatherChart";

function WeatherDashboard() {
  const [currentWeather, setCurrentWeather] = useState([]);
  const [dailySummaries, setDailySummaries] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherResponse = await fetch(
          "http://localhost:5000/api/current-weather"
        );
        const weatherData = await weatherResponse.json();
        setCurrentWeather(weatherData);

        const summaryResponse = await fetch(
          "http://localhost:5000/api/daily-summary"
        );
        const summaryData = await summaryResponse.json();
        setDailySummaries(summaryData);

        const alertsResponse = await fetch("http://localhost:5000/api/alerts");
        const alertsData = await alertsResponse.json();
        setAlerts(alertsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="weather-dashboard">
      <h2>Current Weather</h2>
      {currentWeather.map((weather) => (
        <div key={weather.city}>
          <h3>{weather.city}</h3>
          {weather.temp !== undefined ? (
            <p>Temperature: {weather.temp.toFixed(1)}°C</p>
          ) : (
            <p>Temperature: N/A</p>
          )}
          <p>Condition: {weather.main || "N/A"}</p>
        </div>
      ))}
      <DailySummary summaries={dailySummaries} />
      <AlertsDisplay alerts={alerts} />
      <WeatherChart data={dailySummaries} />
    </div>
  );
}

export default WeatherDashboard;
