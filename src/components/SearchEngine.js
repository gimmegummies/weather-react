import { useState, useEffect } from "react";
import axios from "axios";
import Forecast from "./Forecast";
import { Puff } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

import "./SearchEngine.css";

export default function SearchEngine() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState({
    cityName: null,
    temp: null,
    descr: null,
    humid: null,
    wind: null,
    icon: null,
  });

  useEffect(() => {
    const city = "Kharkiv";
    const apiKey = "99b8f9330a1bfba3a85e523fd3c2e528";
    const units = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    async function getInitialData() {
      try {
        const response = await axios.get(url);
        displayForecast(response);
      } catch (error) {
        console.error("Error occurred during API call:", error.message);
      }
    }
    getInitialData();
  }, []);

  function updateCity(e) {
    let inputVal = e.target.value;
    inputVal = inputVal.trim();
    setCity(inputVal);
  }

  function displayForecast(resp) {
    // console.log(resp);
    const cityName = resp.data.name;
    const temp = Math.floor(resp.data.main.temp);
    const descr = resp.data.weather[0].description;
    const humid = resp.data.main.humidity;
    const wind = resp.data.wind.speed;
    const icon = resp.data.weather[0].main;
    setForecast({
      cityName,
      temp,
      descr,
      humid,
      wind,
      icon,
    });
  }

  async function getForecast(e) {
    e.preventDefault();

    const apiKey = "99b8f9330a1bfba3a85e523fd3c2e528";
    const units = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    try {
      const response = await axios.get(url);
      displayForecast(response);
    } catch (error) {
      alert("Please, type the correct name of the city");
      console.log("Error occurred during API call:", error);
    }
    setCity("");
  }

  return (
    <div className="WeatherApp">
      <form onSubmit={getForecast}>
        <input
          type="search"
          placeholder="Enter a city"
          value={city}
          onChange={updateCity}
        />
        <button type="submit">Search</button>
        {/* <button>Current</button> */}
        <a href="/">
          <FontAwesomeIcon
            icon={faLocationDot}
            style={{
              color: "#a5cc82",
              height: "clamp(30px, 8vh, 45px);",
            }}
            onMouseEnter={(e) => {
              e.target.style.filter = "drop-shadow(5px 5px 10px #FFFFFF)";
            }}
            onMouseLeave={(e) => {
              e.target.style.filter = "none";
            }}
          />
        </a>
      </form>
      {forecast.temp ? (
        <Forecast forecast={forecast} />
      ) : (
        <div className="loading">
          <h3>The data is loading...</h3>
          <Puff
            height="80"
            width="80"
            radius="9"
            color="white"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass="puff-wrapper"
          />
        </div>
      )}
    </div>
  );
}
