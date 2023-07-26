import { useState } from "react";

export default function DailyTemperature({ celsiusTemp }) {
  const [units, setUnits] = useState("celsius");

  function showFahrenheit(e) {
    e.preventDefault();
    setUnits("fahrenheit");
  }

  function showCelsius(e) {
    e.preventDefault();
    setUnits("celsius");
  }

  if (units === "celsius") {
    return (
      <p>
        <span className="temperature">{celsiusTemp}</span> °C |{" "}
        <a href="/" className="unit" onClick={showFahrenheit}>
          °F
        </a>
      </p>
    );
  } else {
    let fahrTemp = Math.round((celsiusTemp * 9) / 5 + 32);
    return (
      <p>
        <span className="temperature">{fahrTemp} </span>
        <a href="/" className="unit" onClick={showCelsius}>
          {" "}
          °C
        </a>{" "}
        | °F
      </p>
    );
  }
}
