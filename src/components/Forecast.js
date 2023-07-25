import ReactAnimatedWeather from "react-animated-weather";
import "./Forecast.css";

export default function Forecast({ forecast }) {
  const { cityName, date, temp, descr, humid, wind, icon } = forecast;
  const icons = {
    clear_sky: "CLEAR_DAY",
    overcast_clouds: "CLOUDY",
    few_clouds: "CLOUDY",
    broken_clouds: "CLOUDY",
    scattered_clouds: "CLOUDY",
    shower_rain: "RAIN",
    light_rain: "RAIN",
    rain: "RAIN",
    thunderstorm: "RAIN",
    mist: "FOG",
    snow: "SNOW",
  };

  return (
    <div className="Forecast">
      <div className="main_weather_info">
        <h2>{cityName}</h2>
        <h3>{date}</h3>
        <h3>{descr}</h3>
      </div>
      <div className="additional_weather_info">
        <div>
          <ReactAnimatedWeather icon={icons[icon]} color="white" />
          <p>
            <span className="temperature">{temp}</span> °C
          </p>
        </div>
        <div>
          <p>Humidity: {humid}%</p>
          <p>Wind: {wind} km/h</p>
        </div>
      </div>
      <div className="6_days_forecast"></div>
    </div>
  );
}
