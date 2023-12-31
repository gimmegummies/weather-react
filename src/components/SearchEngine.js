import { useState, useEffect } from "react";
import axios from "axios";
import Forecast from "./Forecast";
import { Puff } from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import locationServices from "../services/locationServices";

import "./SearchEngine.css";

export default function SearchEngine() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState({
    cityName: null,
    date: null,
    temp: null,
    descr: null,
    humid: null,
    wind: null,
    icon: null,
  });

  const weatherAPIUrl = "https://api.shecodes.io/weather/";
  const apiKey = "785e4002t4o34d2ed60bb3aec801e9af";
  const units = "metric";

  useEffect(() => {
    const city = "Kharkiv";
    const apiKey = "785e4002t4o34d2ed60bb3aec801e9af";
    const units = "metric";
    const url = `${weatherAPIUrl}v1/current?query=${city}&key=${apiKey}&units=${units}`;

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
    // inputVal = inputVal.trim();
    setCity(inputVal);
  }

  function getDate(timestamp) {
    const fullDate = new Date(timestamp * 1000);
    let day = fullDate.toDateString().split(" ").slice(0, 1).join();
    let hours = fullDate.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = fullDate.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    const time = `${hours}:${minutes}`;
    const currentDateTime = `${day} ${time}`;
    return currentDateTime;
  }

  function displayForecast(resp) {
    // console.log(resp);
    const cityName = resp.data.city;
    const timestamp = resp.data.time;
    const date = getDate(timestamp);
    const temp = Math.floor(resp.data.temperature.current);
    const descr = resp.data.condition.description;
    const humid = resp.data.temperature.humidity;
    const wind = resp.data.wind.speed;
    const icon = descr.split(" ").join("_");
    setForecast({
      cityName,
      date,
      temp,
      descr,
      humid,
      wind,
      icon,
    });
  }

  async function getForecast(e) {
    e.preventDefault();

    const url = `${weatherAPIUrl}v1/current?query=${city}&key=${apiKey}&units=${units}`;

    try {
      // console.log(url);
      const response = await axios.get(url);
      displayForecast(response);
    } catch (error) {
      alert("Please, type the correct name of the city");
      console.log("Error occurred during API call:", error);
    }
    setCity("");
  }

  async function getForecastByLocation(e) {
    e.preventDefault();

    try {
      const position = await locationServices.getCurrentLocation();
      const { lat, lon } = position;

      const url = `${weatherAPIUrl}v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;
      const response = await locationServices.getDataForCurrentLocation(url);
      displayForecast(response);
    } catch (err) {
      console.error(err);
    }
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
        <a onClick={getForecastByLocation} href="/">
          <FontAwesomeIcon
            icon={faLocationDot}
            style={{
              color: "#a5cc82",
              height: "clamp(30px, 8vh, 45px)",
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
