import React, { useState } from "react";
import axios from "axios";

export default function Search(props) {
  let [city, setCity] = useState("City..");
  let [weatherData, setWeatherData] = useState({});

  function changeHTML(event) {
    event.preventDefault();

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=667d9f573c8af4c33457be5d561a9148&units=metric`;
    axios.get(url).then((response) => {
      const { temp, humidity } = response.data.main;
      const { description } = response.data.weather[0];
      const { speed } = response.data.wind;
      const { date } = new Date(response.data.dt * 1000);

      setWeatherData({ temp, humidity, description, speed });
    });
  }

  function inputData(event) {
    setCity(event.target.value);
  }

  return (
    <div className="search-form">
      <form onSubmit={changeHTML} id="search-form">
        <input
          type="search"
          onChange={inputData}
          placeholder="Enter a city.."
          required
          id="search-form-input"
          className="search-form-input"
        />
        <input type="submit" value="Search" className="search-form-button" />
      </form>
      {city && (
        <div className="row">
          <div className="h6 col">
            <ul>
              <li>Humidity: {weatherData.humidity}%</li>
              <li>Wind Speed: {Math.round(weatherData.speed)} m/s</li>
              <li>Description: {weatherData.description}</li>
            </ul>
          </div>
          <h4 className="mainCity col">
            <div id="city">{city}</div>
            <div>
              <div className="temp">
                <span className="units" id="temperature">
                  {Math.round(weatherData.temp)} °C
                </span>
              </div>
              <small id="time">Time</small>
            </div>
          </h4>
        </div>
      )}
    </div>
  );
}
