import React, { useState } from "react";
import axios from "axios";

function getForecast(coordinates) {
  let apiKey = "9e503cb340e36b37cd62954f8e718ac7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(Forecast);
}

let button = (
  <button type="submit" onChange={getForecast}>
    Search
  </button>
);

export default function Forecast() {
  const [city, setCity] = useState("");
  function displayForecast(response) {
    let forecast2 = response.data.daily;
    let forecastHTML = `<div class="row">`;
    forecast2.forEach(function (forecastDay, index) {
      if (index > 0) {
        return [
          (forecastHTML =
            forecastHTML +
            `
     <div class="col"> 
       <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
       <img 
         src="http://openweathermap.org/img/wn/${
           forecastDay.weather[0].icon
         }@2x.png" 
         alt=""
         width="42"
         />
       <div class="weather-forecast-temp">
        <span class="max">${Math.round(forecastDay.temp.max)}°</span>
        <span class="min">${Math.round(forecastDay.temp.min)}°</span>
      </div>
    </div>
   `),
        ];
      }
    });

    forecastHTML = forecastHTML + `</div>`;
  }

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
  }
}
