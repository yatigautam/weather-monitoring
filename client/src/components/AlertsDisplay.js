import React from "react";

function AlertsDisplay({ alerts }) {
  return (
    <div className="alerts-display">
      <h2>Weather Alerts</h2>
      {alerts.length > 0 ? (
        <ul>
          {alerts.map((alert, index) => (
            <li key={index}>{alert}</li>
          ))}
        </ul>
      ) : (
        <p>No active alerts</p>
      )}
    </div>
  );
}

export default AlertsDisplay;
