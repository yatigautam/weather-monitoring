# Real-Time Weather Monitoring and Data Processing System 🌦️

This project is a **real-time data processing system** that monitors weather conditions for major Indian metros and provides insightful summaries using rollups and aggregates. The system continuously fetches data from the **OpenWeatherMap API** and offers features such as alert notifications and visualizations for better trend analysis.

---

## 🚀 Features

- **Continuous Weather Data Retrieval**: Automatically fetches weather data for major Indian cities at regular intervals.
- **Daily Summaries**: Aggregated weather data summarized at the end of each day for trend analysis.
- **Alert System**: Triggers alerts when temperature thresholds are crossed.
- **Data Visualizations**: Displays summaries and historical weather trends using interactive charts.
- **Modular and Maintainable Design**: Separate components and services for better organization and easy maintenance.

---

## 🛠️ Prerequisites

Make sure you have the following installed on your machine:
- **Node.js** (v14.0.0 or later)
- **npm** (v6.0.0 or later)
- **MongoDB** (v4.0 or later)
- **OpenWeatherMap API Key** (Get yours [here](https://openweathermap.org/api))

---

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/weather-monitoring.git
cd weather-monitoring
```
## 2. Install Server Dependencies
```bash
cd server
npm install
```
## 3. Install Client Dependencies
```bash
cd ../client
npm install
```
## 4. Configure Environment Variables
Create a .env file in the server directory with the following content:
```makefile
MONGO_URI=mongodb://localhost:27017/weatherDB
API_KEY=your_openweathermap_api_key
PORT=5000
```

---

## ▶️ Running the Application
### 1. Start the MongoDB Service
If MongoDB is installed as a service:

```bash
sudo service mongod start   # On Linux
net start MongoDB            # On Windows
```
## 2. Start the Server
```bash
cd server
npm start
```
The server will be running on http://localhost:5000.

## 3. Start the Client
Open a new terminal and run:

```bash
cd client
npm start
```
The client will be available at http://localhost:3000.

---

## 📊 API Endpoints
```http
GET /api/current-weather   // Retrieves the current weather data for all monitored cities.
GET /api/daily-summary     // Retrieves aggregated daily weather summaries.
GET /api/alerts            // Fetches any active weather alerts.
```

---

## 🛠️ Design Choices
- **MERN Stack**: Built with MongoDB, Express.js, React.js, and Node.js for a full JavaScript-based solution.
- **Real-Time Updates**: Configurable intervals ensure weather data stays up-to-date.
- **Daily Summaries**: Aggregated data simplifies the tracking of weather trends.
- **Alerting System**: Configurable alerts notify users of extreme weather conditions.
- **Visualization with Chart.js**: Users get easy-to-understand graphs and visual trends.
- **Modular Architecture**: Clean separation of components for better maintainability and scalability.

---

## 📌 Contribution Guidelines
Feel free to contribute to this project by submitting pull requests.  
If you find any bugs or want to suggest new features, open an issue on the repository.
