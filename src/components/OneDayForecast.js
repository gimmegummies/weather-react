import { useState, useEffect } from "react";
import AnimatedWeatherIcon from "./AnimatedWeatherIcon";
import axios from "axios";
import "./OneDayForecast.css";

export default function OneDayForecast({ data }) {
  function getDay() {
    const fullDate = new Date(data.time * 1000);
    return fullDate.toDateString().split(" ").slice(0, 1).join();
  }

  function getIcon() {
    return data.condition.description.split(" ").join("_");
  }

  function getMaxTemp() {
    return Math.round(data.temperature.maximum);
  }

  function getMinTemp() {
    return Math.round(data.temperature.minimum);
  }

  return (
    <div className="one_day_forecast">
      <time>{getDay()}</time>
      <AnimatedWeatherIcon size={32} icon={getIcon()} />
      <p className="one_day_temperature">
        <span className="max_temperature">{getMaxTemp()} °C</span>
        <span className="min_temperature">{getMinTemp()} °C</span>
      </p>
    </div>
  );
}
