import React from "react";
import WeatherDashboard from "./components/WeatherDashboard";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Monitoring System</h1>
      </header>
      <main>
        <WeatherDashboard />
      </main>
    </div>
  );
}

export default App;
