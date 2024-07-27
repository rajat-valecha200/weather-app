import React, { useState } from 'react';
import './WeatherApp.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = '1a681b147e1e455290c81151232010';

  const handleSearch = async () => {
    if (!city) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      alert('Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather Application</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter your city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch} style={{ backgroundColor: 'green', color: 'white' }}>
          Search
        </button>
      </div>
      {loading && <p className="loading-message">Loading data…</p>}
      {weatherData && !loading && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weatherData.current.temp_c} °C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weatherData.current.humidity} %</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
