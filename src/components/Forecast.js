import AnimatedWeatherIcon from "./AnimatedWeatherIcon";
import DailyTemperature from "./DailyTemperature";
import MultipleDaysForecast from "./MultipleDaysForecast";
import "./Forecast.css";

export default function Forecast({ forecast }) {
  const { cityName, date, temp, descr, humid, wind, icon } = forecast;

  return (
    <div className="Forecast">
      <div className="main_weather_info">
        <h2>{cityName}</h2>
        <h3>{date}</h3>
        <h3>{descr}</h3>
      </div>
      <div className="additional_weather_info">
        <div>
          <AnimatedWeatherIcon icon={icon} />
          {/* <ReactAnimatedWeather icon={icons[icon]} color="white" /> */}
          {/* <p>
            <span className="temperature">{temp}</span> °C
          </p> */}
          <DailyTemperature celsiusTemp={temp} />
        </div>
        <div>
          <p>Humidity: {humid}%</p>
          <p>Wind: {wind} km/h</p>
        </div>
      </div>
      <div className="multiple_days_forecast">
        <MultipleDaysForecast city={cityName} />
      </div>
    </div>
  );
}
