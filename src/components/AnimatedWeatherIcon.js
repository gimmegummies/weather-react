import ReactAnimatedWeather from "react-animated-weather";

export default function AnimatedWeatherIcon({ icon, size }) {
  const icons = {
    clear_sky: "CLEAR_DAY",
    sky_is_clear: "CLEAR_DAY",
    overcast_clouds: "CLOUDY",
    few_clouds: "CLOUDY",
    broken_clouds: "CLOUDY",
    scattered_clouds: "CLOUDY",
    shower_rain: "RAIN",
    moderate_rain: "RAIN",
    light_rain: "RAIN",
    rain: "RAIN",
    thunderstorm: "RAIN",
    heavy_intensity_rain: "RAIN",
    mist: "FOG",
    fog: "FOG",
    snow: "SNOW",
  };

  return <ReactAnimatedWeather icon={icons[icon]} color="white" size={size} />;
}
