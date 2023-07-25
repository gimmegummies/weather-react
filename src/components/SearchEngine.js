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

  const weatherAPIUrl = "https://api.shecodes.io/weather/";

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
    inputVal = inputVal.trim();
    setCity(inputVal);
  }

  function displayForecast(resp) {
    // console.log(resp);
    const cityName = resp.data.city;
    const temp = Math.floor(resp.data.temperature.current);
    const descr = resp.data.condition.description;
    const humid = resp.data.temperature.humidity;
    const wind = resp.data.wind.speed;
    const icon = descr.split(" ").join("_");
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

    const apiKey = "785e4002t4o34d2ed60bb3aec801e9af";
    const units = "metric";
    const url = `${weatherAPIUrl}v1/current?query=${city}&key=${apiKey}&units=${units}`;

    try {
      console.log(url);
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
