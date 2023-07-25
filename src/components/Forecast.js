import ReactAnimatedWeather from "react-animated-weather";
import "./Forecast.css";

export default function Forecast({ forecast }) {
  const { cityName, temp, descr, humid, wind, icon } = forecast;
  const icons = {
    Clear: "CLEAR_DAY",
    Clouds: "CLOUDY",
    Rain: "RAIN",
    Mist: "FOG",
    Snow: "SNOW",
  };

  return (
    <div className="Forecast">
      <div className="main_weather_info">
        <h2>{cityName}</h2>
        <h3>Thursday 16:26</h3>
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
