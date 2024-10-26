import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function WeatherChart({ data }) {
  const chartData = {
    labels: data.map((summary) => new Date(summary.date).toLocaleDateString()),
    datasets: [
      {
        label: "Average Temperature",
        data: data.map((summary) => summary.avgTemp),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Temperature Trend",
      },
    },
  };

  return (
    <div className="weather-chart">
      <Line data={chartData} options={options} />
    </div>
  );
}

export default WeatherChart;
