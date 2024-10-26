import React from "react";

function DailySummary({ summaries }) {
  return (
    <div className="daily-summary">
      <h2>Daily Weather Summary</h2>
      {summaries.map((summary) => (
        <div key={summary._id}>
          <h3>
            {summary.city} - {new Date(summary.date).toLocaleDateString()}
          </h3>
          <p>Average Temp: {summary.avgTemp.toFixed(1)}°C</p>
          <p>Max Temp: {summary.maxTemp.toFixed(1)}°C</p>
          <p>Min Temp: {summary.minTemp.toFixed(1)}°C</p>
          <p>Dominant Condition: {summary.dominantCondition}</p>
        </div>
      ))}
    </div>
  );
}

export default DailySummary;
