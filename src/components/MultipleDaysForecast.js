import { useState, useEffect } from "react";
import OneDayForecast from "./OneDayForecast";
import axios from "axios";

export default function MultipleDaysForecast({ city }) {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    async function getForecast() {
      const apiKey = "785e4002t4o34d2ed60bb3aec801e9af";
      const units = "metric";
      const url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=${units}`;

      try {
        // console.log(url);
        const data = await axios.get(url);
        const dailyForecast = await data.data.daily;
        // console.log(dailyForecast);
        setForecast(dailyForecast);
      } catch (error) {
        console.log("Error occurred during API call:", error);
      }
    }

    getForecast();
  }, [city]);

  return (
    <>
      {forecast.map((dailyForecast, index) => {
        if (index > 0 && index < 6) {
          return (
            <span key={index}>
              <OneDayForecast data={dailyForecast} />
            </span>
          );
        } else {
          return null;
        }
      })}
      {/* <OneDayForecast data={forecast[0]} /> */}
    </>
  );
}
